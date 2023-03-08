console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  self.registration.showNotification(
    data.title, // title of the notification
    {
      body: data.customBody, //the body of the push notification
      // image: "https://www.sharif.edu/documents/20124/0/logo-fa-IR.png/4d9b72bc-494b-ed5a-d3bb-e7dfd319aec8?t=1609608338755",
      // icon: "https://www.sharif.edu/documents/20124/0/logo-fa-IR.png/4d9b72bc-494b-ed5a-d3bb-e7dfd319aec8?t=1609608338755" // icon
    }
  );
});