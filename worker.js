async function handleContact(request, env) {
  const receivedData = await request.formData();
  const userName = receivedData.get("name");
  const userEmail = receivedData.get("email");
  const userOrg = receivedData.get("org");
  const userCountry = receivedData.get("country");
  const userRequest = receivedData.get("message");
  try {
    const result = await env.EMAIL.send({
      from: "contact@asymmetrica.com.ua",
      to: "asmtrcsupport@gmail.com",
      subject: `Нове повідомлення з сайту від ${userOrg}`,
      text:
        `Нова заявка з сайту
        ПІБ: ${userName}
        Email: ${userEmail}
        Країна: ${userCountry}
        Організація: ${userOrg}
        Запит:
        ${userRequest}`.trim()
    });
    return new Response(JSON.stringify({
      success: true,
      messageId: result.messageId
    }), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Email sending error:", error.code, error.message);

    return new Response(JSON.stringify({
      success: false,
      code: error.code,
      error: error.message
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact" && request.method === "POST") {
      return handleContact(request, env);
    }

    return env.ASSETS.fetch(request);
  }
};
