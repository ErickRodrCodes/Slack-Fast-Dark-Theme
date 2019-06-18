/**
the content of this file goes below of the ssb-interop.js library in your slack

/ First make sure the wrapper app is loaded
document.addEventListener("DOMContentLoaded", function() {

  // Then get its webviews
  let webviews = document.querySelectorAll(".TeamView webview");

  // Fetch our CSS in parallel ahead of time
  const cssPath = 'https://cdn.rawgit.com/widget-/slack-black-theme/master/custom.css';
  let cssPromise = fetch(cssPath).then(response => response.text());

  let customCustomCSS = `
  body,body img,.c-message_attachment__image,.client_channels_list_container,
  .menu_body,.menu_body section,[class*=emoji],[class*=thumb],ts-icon,
  [class*="p-dnd"],#im_list_container [class*=ts_icon_presence],.member_details_over_image, 
  .call_start_content, .c-search-autocomplete .ts_icon, .ql-editor .ts_icon, .tab_complete_ui_item .ts_icon,
  .member_presence_USLACKBOT .ts_icon, .p-prefs_modal__notification_example .p-prefs_modal__notification_example__slack_app_icon,
  .ts_toggle_button, #messages_container .c-pillow_file__preview, #messages_container .c-pillow_file__icon,
  .CodeMirror, #channel_header_info .presence {
    filter:invert(100%);
  }

  .p-file_image_thumbnail__image, h3[class^="p-emoji"],#emoji-picker-sticky-header,.p-emoji_picker__group_tab--active,
  .p-emoji_picker__preview_img *, .p-channel_sidebar__static_list [class*="emoji"], .texty_emoji_only .emoji{
      filter:invert(0%);
  }
  `;
  
  let s = document.createElement('style');
  s.type = 'text/css';
  s.innerHTML = customCustomCSS;
  document.head.appendChild(s);

  // Wait for each webview to load
  webviews.forEach(webview => {

              let script = `
                    let s = document.createElement('style');
                    s.type = 'text/css';
                    s.id = 'slack-custom-css';
                    s.innerHTML = \`${customCustomCSS}\`;
                    document.head.appendChild(s);
                    `
              webview.executeJavaScript(script);


  });
});
