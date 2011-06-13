
# checkSpam 

Create a function `checkSpam(str)` which returns `true` if `str` contains 'viagra' or 'XXX'.

The function should be case-insensitive:

[js]
checkSpam('buy ViAgRA now') == true
checkSpam('free xxxxx') == true
checkSpam("innocent rabbit") == false
[/js]



=Solution

To check in a case-insensitive way, we need to lowercase the `str` first, and then look for (also lowercased) substrings:

[js]
function checkSpam(str) {
  str = str.toLowerCase()
       
  return str.indexOf('viagra') >= 0 || str.indexOf('xxx') >= 0
}
[/js]

The full solution is at [play src="/assets/intro/checkSpam.html"].


