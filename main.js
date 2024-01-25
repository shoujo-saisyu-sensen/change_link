const convertLink = async () => {
  const currentUrl = window.location.href;

  const domains = (await chrome.storage.local.get("domains"))["domains"];

  // 指定キーなし
  if (!domains) {
    return;
  }

  const lists = await Promise.all(
    domains.map(async (domain) => {
      return {
        domain,
        config: (await chrome.storage.local.get(domain))[domain],
      };
    })
  );

  // リストなし
  if (!lists) {
    return;
  }

  const currentDomain = lists.find(({ domain }) =>
    currentUrl.startsWith(domain)
  );

  // 対象のドメインがない場合は何もしない
  if (!currentDomain) {
    return;
  }

  const config = currentDomain.config;

  // filterしたいのでArrayにする
  const aTags = Array.from(document.getElementsByTagName("a"));

  // aタグが存在しない場合
  if (aTags.length === 0) {
    return;
  }

  config.forEach(({ from, to }) => {
    const targetTag = aTags.filter(({ href }) => href === from);

    if (targetTag.length === 0) {
      return;
    }

    targetTag.forEach((element) => element.setAttribute("href", to));
  });
};

convertLink();
