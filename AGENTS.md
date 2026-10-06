<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep the nine SQL entities and validation in a browser-safe data module, with a shared local-storage context as the replaceable demo repository; this isolates a future API migration from page layouts.
- Use file-based routes for all requested pages and a shared dashboard shell; this preserves deep links and consistent navigation.
- Demo login is a local presentation session, never an authorization or production authentication mechanism; no protected server resources exist.
