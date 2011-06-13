
# Truncate 

Write a function `truncate(str, maxlength)` that check string `str` length. 
If the length of `str` is more than `maxlength` chars, it cuts `str` and appends it with `'...'` to make the length equal to `maxlength`.

The returned value is a (possibly) corrected string

For example:
[js]
truncate("and here is what I want to say on that matter:", 20)) = "and here is what ..."

truncate("hi to all!", 20)) = "hi to all!"
[/js]

This function is useful not just for a task, but for real-life, in truncating user-given subjects etc. 


=Solution

The solution: [play src="/assets/intro/string/truncate.html"].

