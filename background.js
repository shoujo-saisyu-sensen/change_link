chrome.tabs.onUpdated.addListener(async (_, changeInfo, tab) => {
  const domains = (await chrome.storage.local.get("domains"))["domains"];

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

  if (!lists || lists.length === 0) return;

  // ロードの完了を待つ
  if (changeInfo.status === "complete") {
    const isTargetSite = lists.some(({ domain }) => tab.url.includes(domain));

    // 対象サイトでない場合は何もしない
    if (!isTargetSite) {
      return;
    }

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["main.js"],
    });
  }
});
