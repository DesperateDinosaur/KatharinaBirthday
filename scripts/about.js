async function getData() {
  const url = "https://api.api-ninjas.com/v1/randomword?type=adjective";
  try {
      const resp = await fetch(
          url,
          {
            headers: {
              "Content-Type": "application/json",
              "X-Api-Key": "Y+szJgbC2jy7fYrSZxNUtg==7l2aMeTExrYw50sB"
            }
          }
      );
  if (!resp.ok) {
      throw new Error('Response status $(response.status)');
  }
  
  const json = await resp.json();
  console.log(json);
  
  } catch (error) {
      console.error(error.message);
  }
}