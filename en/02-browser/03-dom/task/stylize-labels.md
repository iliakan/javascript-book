
# Stylize labels 

For the document [play src="/assets/browser/dom/searchTask.html"]:

Find all labels inside the table. The result should be an array (or pseudo-array) of labels.


=Solution

The solution:
[js]
var table = document.getElementById('age-table')
var labels = table.getElementsByTagName('label')
[/js]


