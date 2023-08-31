# userway-test

ТЗ:
Assignment – URL Shortener 
Introduction 
I think we can all agree that there aren't enough URL shorteners in the world, so 
the goal of this assignment is to create a URL shortener service prototype. The 
minimum requirements are: 
• It compiles and runs 
• It has a cool name 
• It does what it is suppose to do 
(Not very surprising requirements for a project). 
Now, let's describe what we're looking for in this assignment. Because we want 
this to be a short assignment, we have two parts to it: the prototype part where 
you actually will write some code, and the "what if" part where you would just 
explain how you'd tackle this at scale. 
Part 1 - Prototype (Code) 
Here we just want something that works - not a production or fancy system here.
You decide how little or how much code that would require. You also decide what 
the API would be or how you interact with this service. We'll just describe in words 
what this thing is supposed to do and you can take it from there. If you're not sure 
about something, make an assumption and let us know what it is. 
THINGS IT SHOULD DO 
• It should be in Node.js. 
• It should be an HTTP REST-based service. 
• It should do two things: 
o You can submit a URL and get back a "shortened" version. E.g. 
submit "http://www.xplace.com" and get back "http://xpl.ac/abcdef". 
▪ The format of the URL returned is up to you - this is just an 
example. 
▪ The shortened URLs should resolve to only one source URL. 
o You can resolve a shortened URL to get back the original URL. E.g. 
submit "http://xpl.ac/abcdef" and get back "http://www.xplace.com". 
• It should be organized for easy compilation and packaging. Choose your 
poison of Ivy / Ant, Maven, Gradle, duct tape, etc. 
KEEP IT SIMPLE 
Just to reiterate, keep it simple to understand and don't spend too much time on 
it. It's a prototype. 
Part 2 - What If 
Having done the work above to create a prototype of the URL shortener service,
let's think about this at a larger scale.   What if this service needed to scale to 
10,000 URL generation requests per second? How about 100,000 URL resolve 
requests per second? Describe how you'd actually architect a system like this. 
Specifically, how would the URL generation work at scale (and what generation 
method you'd use) and how the URL resolving would work at scale. How would 
you store the data? How long would you keep it around? 
Please write up a short paragraph or two describing the above. We're not looking 
for a design document, but a short and sweet explanation you'd give to a team 
mate at the coffee machine. 
Done! 
Once those two are done, send over your code from part 1 and text from part 2.
Thanks for taking the time to do this and showing interest!
