export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const host = new URL(request.url).hostname;
    const isProd = host === "andromera.com" || host === "www.andromera.com";

    const newHeaders = new Headers(response.headers);
    if (!isProd) {
      newHeaders.set("X-Robots-Tag", "noindex, nofollow");
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }
};
