# ТЗ:
## Assignment – URL Shortener 
### Introduction 

I think we can all agree that there aren't enough URL shorteners in the world, so the goal of this assignment is to create a URL shortener service prototype. The minimum requirements are: 

* It compiles and runs 
* It has a cool name
* It does what it is suppose to do

(Not very surprising requirements for a project).

Now, let's describe what we're looking for in this assignment. Because we want this to be a short assignment, we have two parts to it: the prototype part where you actually will write some code, and the "what if" part where you would just explain how you'd tackle this at scale. 

## Part 1 - Prototype (Code) 
Here we just want something that works - not a production or fancy system here. You decide how little or how much code that would require. You also decide what the API would be or how you interact with this service. We'll just describe in words what this thing is supposed to do and you can take it from there. If you're not sure about something, make an assumption and let us know what it is. 

THINGS IT SHOULD DO 
* It should be in Node.js. 
* It should be an HTTP REST-based service. 
* It should do two things: 
    * You can submit a URL and get back a "shortened" version. E.g. submit "http://www.xplace.com" and get back "http://xpl.ac/abcdef".
        * The format of the URL returned is up to you - this is just an example. 
        * The shortened URLs should resolve to only one source URL. 
    * You can resolve a shortened URL to get back the original URL. E.g. submit "http://xpl.ac/abcdef" and get back "http://www.xplace.com".
* It should be organized for easy compilation and packaging. Choose your poison of Ivy / Ant, Maven,Gradle, duct tape, etc. 

**KEEP IT SIMPLE**

Just to reiterate, keep it simple to understand and don't spend too much time on it. It's a prototype.

## Part 2 - What If 
Having done the work above to create a prototype of the URL shortener service, let's think about this at a larger scale.   What if this service needed to scale to 10,000 URL generation requests per second? How about 100,000 URL resolve requests per second? Describe how you'd actually architect a system like this. Specifically, how would the URL generation work at scale (and what generation method you'd use) and how the URL resolving would work at scale. How would you store the data? How long would you keep it around?

Please write up a short paragraph or two describing the above. We're not looking for a design document, but a short and sweet explanation you'd give to a team mate at the coffee machine. 

## Done! 
Once those two are done, send over your code from part 1 and text from part 2.

Thanks for taking the time to do this and showing interest!
______________

# Реализация

API доступно по адресу http://localhost:3000/api/

Присутствует swagger с описанием и возможностью выполнить методы.

СУБД выбрана по условию задачи MySQL. В получении полных ссылок участвует Redis. Доступны в контейнере, в репозитории присутствует docker-compose.

## По структуре проекта
В корне проекта в каталоге /services лежит файл docker-compose и данные контейнера.

В /app находится код приложения

Конфиг env и microORM лежат в /app/config

## Описание

Чтоб использовать в проекте несколько модулей, я решил реализовать с воможностью указания домена для формирования короткой ссылки. Модуль для выбора домена называется **Prefix**, модуль для работы со ссылками называется **ShortLink**.

Бизнес-задача придумана такая, что предполагает короткую ссылку в виде <домен>/<код>. Под <доменом> полагается некий домен (сервер), который по факту должен резолвить короткую ссылку в полную.

Я считаю что нет смысла хранить короткую ссылку в явном виде из-за избыточности информации. Используя метод POST/api/prefix мы можем задать формирование коротких ссылок с новым доменом, причем сформированные ранее короткие ссылки будут все равно разрешимы.
Например короткая ссылка вида http://xpl.ac/123 используя домен http://xpl.ac.

Используя метод POST/api/prefix мы установим новый домен http://xpl2.ac и новые ссылки буду пормироваться вида http://xpl2.ac/124

По нашей базнес-логике мы используем для формирования короткой ссылки последний установленный домен. Это прототип - оставляем простым.

Модуль **ShortLink** имеет методы POST/api/shortlink для передачи в Body параметров с длинной ссылкой. В ответе получаем иформацию с короткой ссылкой, id, временем создания

Метод GET/api/shortlink имеет параметр с короткой ссылкой. В ответе получаем строку - полную ссылку.

Как это работает. Уникальность короткой ссылки обеспечивается первичным ключем в таблице **shortlink**. Собственно, короткая ссылка строится как домен + ID. И при обработке короткой ссылки я извлекаю ID, которому соответствует полная ссылка.

Предусмотрена обработка ошибки если не получилось получить ID из короткой ссылки. Так же если не получилось найти полную ссылку по ID. По более сложному варианту можно было бы производить поиск по паре домен+ID, это не реализовано (оставляем проще).

# Рассуждения о высокой нагрузке

Первичные запросы могут поступать от клиента в некое центральное API, которое будет отправлять данные в RabbitMQ/Kafka. 

Могут работать несколько экземпляров сервера генерации shortLink и забирать данные из RabbitMQ по мере отработки. 

Некоторые общие рекомендации:
1. Реализация должна быть под конкретную бизнес-задачу. Это не будет эффективно на все случаи.
2. Должна быть правильно продумана структура БД. Продумать построение индексов. Индексы увеличивают стоимость записи данных. Возможно, стоит делать запись в отдельную таблицу и периодически переность данные в общую талицу, из которой будем читать данные.
3. Подумать о кластеризации СУБД, шардирование и партиционирование базы.
4. Запустить несколько экземпляров нашей Node.


Идея генерировать url с помощью первичного ключа мне кажется вполне подходящая - нам не нужно дополнительно беспокоится об уникальности.

Можно хранить дополнительные параметры времени срока жизни данных как единая опция или в разрезе каждого домена (prefix). Время жизни в Redis стоит установить из практического опыта.