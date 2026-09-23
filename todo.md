# Quazi Labs Website Copy Rewrite

- [x] Read and extract approved copy from `/home/ubuntu/upload/pasted_content.txt`
- [x] Compare the uploaded document against current public website copy
- [x] Rewrite page copy using the uploaded document as the source of truth
- [x] Remove superseded, unsupported, or prohibited terms and claims
- [x] Verify the site build and scan the source for disclosure violations
- [x] Capture a representative preview and review readability
- [ ] Save a checkpoint so the update is published
- [ ] Deliver the live version and summarize the changes

## Disclosure gate

Any requested public-facing statistic, technical detail, or terminology that is not supported by the uploaded protocol must be held back until the user provides proof sufficient for public disclosure.

## Style gate

Preserve the existing visual design unless the uploaded document explicitly requires a visual change. This task is primarily a copy rewrite.

## Return protocol

If the user returns an edited copy document, map edits by section labels and preserve the disclosure gate above.

## Status

Current phase: Verified and ready for checkpoint.
Last updated: 2026-08-26

## References

- Uploaded source document: `/home/ubuntu/upload/pasted_content.txt`
- Existing editable website copy: `/home/ubuntu/quazi-website-copy.txt`
- Current page component: `/home/ubuntu/quazi-acquisition-site/client/src/pages/Home.tsx`
- Current page metadata: `/home/ubuntu/quazi-acquisition-site/client/index.html`

## Notes

- Do not add public-facing details merely because they appear in older website copy.
- Treat the uploaded document as the controlling source for the rewrite.
- Keep all public copy non-confidential and appropriate for an acquisition/pilot inquiry page.
