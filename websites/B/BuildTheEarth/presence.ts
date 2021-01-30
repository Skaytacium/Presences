const presence = new Presence({
    clientId: "805070274847440916"
  });
  
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    browsingStamp = Math.floor(Date.now() / 1000), 
    privacy = await presence.getSetting("privacy"),
    sprivacy = await presence.getSetting("sprivacy");
    
  presenceData.startTimestamp = browsingStamp;
  if (privacy) {
    presenceData.details = "Browsing";
  } else if (window.location.pathname.endsWith("me")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Profil";
  } else if (window.location.pathname.endsWith("faq")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "FAQ";
  } else if (window.location.pathname.endsWith("map")) {
    presenceData.smallImageKey = "map";
    presenceData.details = "Viewing a page:";
    presenceData.state = "Map : "+Math.floor(Number(document.getElementById('map_tpll_command').textContent.replace('/tpll ','').split(' ')[0])*10)/10+' | '+Math.floor(Number(document.getElementById('map_tpll_command').textContent.replace('/tpll ','').split(' ')[1])*10)/10;
    if (sprivacy) presenceData.state = "Map";
  } else if (window.location.pathname.endsWith("buildteams")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "BuildTeams";
  } else if (window.location.pathname.endsWith("contact")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Contact";
  } else if (window.location.pathname.endsWith("upload")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Upload your world";
  } else {
    presenceData.details = "Viewing a page:";
    presenceData.state = document.title.replace(' - BuildTheEarth','');
    if (window.location.pathname.length != 1) presenceData.details = "Viewing a BuildTeams:";
  } 

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
