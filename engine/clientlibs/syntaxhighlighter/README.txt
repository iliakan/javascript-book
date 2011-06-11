INSTALLATION
-------------

Step 1) Download the latest Syntax highlighter javascript library from
http://alexgorbatchev.com/wiki/SyntaxHighlighter, extract the content and place
that inside any of the following directories.

  -  Inside the syntaxhighlighter module directory
       This is not recommended. It's only for backward compability.
  -  Site-file-directory-path
       usually sites/<site_domain>/files. This location is not recommended.
       Only use this if you for some reason need to run different versions of
       the syntaxhighlighter library for different sites in you multi-site install.
  -  sites/all/libraries
       Recommended. This is Drupal's standard third party library install location.

Library directory can be nested in any sub-directory of any name **except 'src'**.
Do not use the 'src' directory name to store the library.

Example:

sites/all/libraries/js/syntaxhighlighter_2.0.320

Step 2) Enable the syntaxhighlighter module


SETUP
-----

Enable the Syntaxhighlighter filter in an input format where you want to
syntaxhighlight code.

IMPORTANT: the Syntaxhighlighter filter must be *after* the
HTML filter and must allow the <pre> tag.  The default Filter HTML setting
do not have the <pre> tag. You must add <pre> to the allow list.


CONFIGURATION
-------------

Go to admin/settings/syntaxhighlighter to configure.


USAGE
-----

Syntax highlight code in node or comment with:

{syntaxhighlighter OPTIONS}
  any program code verbatim
  ...
{/syntaxhighlighter}

where OPTIONS is a Syntaxhighlighter options string. Visit
http://alexgorbatchev.com/wiki/SyntaxHighlighter to get details.

NOTE: it's not necessary to escape '<' and '>' in program code. The filter does
that. So you can leave your code totally unchanged.

GET HELP
--------

Go to admin/help/syntaxhighlighter or filter/tips to get help

