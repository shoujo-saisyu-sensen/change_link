# 画面上のリンクを上書きするやつ

ドメインのローカルでの持ち方

```json
{ "domains": ["domain1"] }
```

config のローカルでの持ち方

```json
{
  "domain1": [
    {
      "from": "https://qiita.com",
      "to": "https://team-lab.com"
    },
    {
      "from": "https://qiita.com2",
      "to": "https://team-lab.com2"
    }
  ]
}
```
