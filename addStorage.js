const button = document.getElementById("addButton");
const deleteButton = document.getElementById("deleteButton");
const testDeleteButton = document.getElementById("deleteButton");

button.addEventListener("click", async (e) => {
  e.preventDefault();

  const domain = document.getElementById("domain").value;
  const config = document.getElementById("config").value;

  // TODO やるならフォーム側でやりたい or フィードバック入れたい
  if (!domain || !config) {
    return;
  }

  const storedConfig = (await chrome.storage.local.get(domain))[domain];

  // 保持しているconfigが存在しない場合はdomainsに新規に追加
  if (!storedConfig) {
    const domains = await chrome.storage.local.get("domains")["domains"];

    chrome.storage.local.set({
      domains: domains ? Array.from(new Set([...domains, domain])) : [domain],
    });
  }

  chrome.storage.local.set({ [domain]: JSON.parse(config) });
});

deleteButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const deleteDomain = document.getElementById("deleteDomain").value;

  if (!deleteDomain) {
    return;
  }

  // configの削除
  chrome.storage.local.remove(deleteDomain);

  const domains = await chrome.storage.local.get("domains")["domains"];

  // ドメインの削除
  if (domains) {
    chrome.storage.local.set({
      domains: domains.filter((domain) => domain !== deleteDomain),
    });
  }
});
