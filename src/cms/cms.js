import CMS from "netlify-cms-app"
import ctaEditor from "./editor-components/cta"
import heroBlock from "./editor-components/heroBlock"
import latestPosts from "./editor-components/LatestPosts"
import PreviewTemplate from './preview-templates/page'
CMS.registerPreviewStyle("/admin/editor-style.css");

CMS.registerEditorComponent(heroBlock)
CMS.registerEditorComponent(ctaEditor)
CMS.registerEditorComponent(latestPosts)

CMS.registerPreviewTemplate('pages', PreviewTemplate)
