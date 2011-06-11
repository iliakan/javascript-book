<?php
// $Id: syntaxhighlighter.admin.inc,v 1.11 2009/12/08 02:53:03 mattyoung Exp $

/**
 * @file
 * Syntax highlighter module admin form
 *
 * Define the admin form
 */

/**
 * An admin form to specify which language to support for highlighting
 */
function syntaxhighlighter_settings_form() {
  $path = _syntaxhighlighter_get_lib_location();

  $files = file_scan_directory($path .'/scripts', 'shBrush.*\.js');
  foreach ($files as $file) {
    $lang_options[$file->basename] = substr($file->name, 7);
  }
  ksort($lang_options);
  $form['syntaxhighlighter_enabled_languages'] = array(
    '#type' => 'checkboxes',
    '#title' => t('Enabled languages'),
    '#options' => $lang_options,
    '#default_value' => variable_get('syntaxhighlighter_enabled_languages', array('shBrushPhp.js')),
    '#description' => t('Only the selected languages will be enabled and its corresponding required Javascript files loaded.  You may only want to choose the languages you actual display on your site to lower the amount of Javascript files loaded. For details please see <a href="http://alexgorbatchev.com/wiki/SyntaxHighlighter:Brushes">the Syntax Highlighter Javascript Library Page</a>.'),
    '#multicolumn' => array('width' => 3),
    '#checkall' => TRUE,
  );

  $files = file_scan_directory($path .'/styles', 'shTheme.*\.css', array('.', '..', 'CVS', 'shThemeDefault.css'));
  foreach ($files as $file) {
    $theme_options[$file->basename] = substr($file->name, 7);
  }
  ksort($theme_options);
  $theme_options = array_merge(array('shThemeDefault.css' => 'Default'), $theme_options);
  $form['syntaxhighlighter_theme'] = array(
    '#type' => 'radios',
    '#title' => t('Theme'),
    '#description' => t('Choose a syntax highlight theme.'),
    '#options' => $theme_options,
    '#default_value' => variable_get('syntaxhighlighter_theme', 'shThemeDefault.css'),
    '#multicolumn' => array('width' => 2),
  );

  $form['syntaxhighlighter_tagname'] = array(
    '#type' => 'textfield',
    '#title' => t('Tag name'),
    '#description' => t('Use different tag to markup code.'),
    '#default_value' => variable_get('syntaxhighlighter_tagname', 'pre'),
    '#size' => 10,
  );
  $form['syntaxhighlighter_legacy_mode'] = array(
    '#type' => 'radios',
    '#title' => t('Legacy mode'),
    '#description' => t('Enable pre-2.0 style markup support.'),
    '#options' => array(t('Disabled'), t('Enabled')),
    '#default_value' => variable_get('syntaxhighlighter_legacy_mode', 0),
  );

    // Fix a javascript compability issue with imce reported by gmark
    // Don't inject syntax highlighter javascript on "off pages"
  $form['syntaxhighlighter_off_pages'] = array(
    '#type' => 'textarea',
    '#title' => t('Turn off Syntax Highlighter on these pages'),
    '#default_value' => variable_get('syntaxhighlighter_off_pages', "admin\nadmin/*\nuser\nuser/*\nimce\nimce/*\n"),
    '#description' => t("Enter one page per line as Drupal paths. The '*' character is a wildcard. Example paths are %blog for the blog page and %blog-wildcard for every personal blog. %front is the front page.", array('%blog' => 'blog', '%blog-wildcard' => 'blog/*', '%front' => '<front>')),
  );

  $form['syntaxhighlighter_default_expressions'] = array(
    '#type' => 'textarea',
    '#title' => t('Default expressions'),
    '#default_value' => variable_get('syntaxhighlighter_default_expressions', ''),
    '#description' => t('Enter syntaxhihglighter default settings javascript expressions, e.g. !example. See the <a href="!link">syntaxhighlighter js lib doc page</a> for details. Note: these default settings affect the entire site unless they are overridden locally.',
                         array('!example' => '<code>SyntaxHighlighter.defaults[\'auto-links\'] = true;SyntaxHighlighter.defaults[\'gutter\'] = false;</code>',
                               '!link' => 'http://alexgorbatchev.com/wiki/SyntaxHighlighter:Configuration',
                         )),
  );

  return system_settings_form($form);
}

