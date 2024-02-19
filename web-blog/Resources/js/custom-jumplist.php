function wpcom_custom_jumplist_reader(){window.external.msSiteModeCreateJumplist("Recent posts");window.external.msSiteModeAddJumpListItem("Before Sunrise: An Unseen Muse, A Cinematic Ode to a Night Lost in Time","https://arfazhussain.wordpress.com/2024/02/19/before-sunrise-an-unseen-muse-a-cinematic-ode-to-a-night-lost-in-time/","https://arfazhussain.files.wordpress.com/2024/02/arfazhxsse-5.webp?w=16");window.external.msSiteModeAddJumpListItem("Hello World!","https://arfazhussain.wordpress.com/2024/02/19/hello-world/","https://arfazhussain.files.wordpress.com/2024/02/arfazhxsse-5.webp?w=16");}

function wpcom_sitemode_comment_notify() {
  var req = new window.XMLHttpRequest;
  req.open('GET', '/wp-content/plugins/ie-sitemode/comments.php', false);
  req.send();
  if (req.readyState===4 && req.status===200) {
    var data = JSON.parse(req.responseText);
    if ( data && data.count && data.count > 0 ) {
      window.external.msSiteModeSetIconOverlay('http://s0.wp.com/i/icons/comment.ico', data.count + ' ' + "Pending comments");
      if ( data.comments && data.comments.length > 0 ) {
        window.external.msSiteModeCreateJumplist("Pending comments");
        for (var i = 0; i < data.comments.length; i++) {
          window.external.msSiteModeAddJumpListItem(data.comments[i].author, 'https://arfazhussain.wordpress.com/wp-admin/comment.php?action=editcomment&c=' + data.comments[i].ID , 'http://s0.wp.com/i/icons/comment.ico');
        }
      }
    } else {
      window.external.msSiteModeClearIconOverlay();
    }
  }
}try{if(window.external && 'msIsSiteMode' in window.external){if (window.external.msIsSiteMode()){wpcom_custom_jumplist_reader();wpcom_sitemode_comment_notify();}}}catch(e){}