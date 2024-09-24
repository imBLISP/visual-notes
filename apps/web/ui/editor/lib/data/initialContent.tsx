export const initialContent = {
    "type": "doc",
    "content": [
        {
            "type": "paragraph",
            "attrs": {
                "uid": "abf5132d-469c-49b7-b548-0de08dbef25a",
                "class": null,
                "textAlign": "left"
            },
            "content": [
                {
                    "type": "text",
                    "text": "Welcome to our React Block Editor Template built on top of "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "link",
                            "attrs": {
                                "href": "https://tiptap.dev/",
                                "target": "_blank",
                                "rel": "noopener noreferrer nofollow",
                                "class": null
                            }
                        }
                    ],
                    "text": "Tiptap"
                },
                {
                    "type": "text",
                    "text": ", "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "link",
                            "attrs": {
                                "href": "https://nextjs.org/",
                                "target": "_blank",
                                "rel": "noopener noreferrer nofollow",
                                "class": null
                            }
                        }
                    ],
                    "text": "Next.js"
                },
                {
                    "type": "text",
                    "text": " and "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "link",
                            "attrs": {
                                "href": "https://tailwindcss.com/",
                                "target": "_blank",
                                "rel": "noopener noreferrer nofollow",
                                "class": null
                            }
                        }
                    ],
                    "text": "Tailwind"
                },
                {
                    "type": "text",
                    "text": ". This project can be a good starting point for your own implementation of a block editor."
                }
            ]
        },
        {
            "type": "codeBlock",
            "attrs": {
                "language": null
            },
            "content": [
                {
                    "type": "text",
                    "text": "import { useEditor, EditorContent } from '@tiptap/react'\n\nfunction App() {\n  const editor = useEditor()\n\n  return <EditorContent editor={editor} />\n}"
                }
            ]
        },
        {
            "type": "paragraph",
            "attrs": {
                "uid": "5a105c9b-551e-4176-9ac6-63658b0a7a6e",
                "class": null,
                "textAlign": "left"
            },
            "content": [
                {
                    "type": "text",
                    "text": "This editor includes features like:"
                }
            ]
        },
        {
            "type": "bulletList",
            "content": [
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "064a0ab8-e0ce-46ee-aa5e-947522e37749",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "A DragHandle including a DragHandle menu"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "1ad133d0-5ccd-46b1-9daa-35e063820c92",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "A Slash menu that can be triggered via typing a "
                                },
                                {
                                    "type": "text",
                                    "marks": [
                                        {
                                            "type": "code"
                                        }
                                    ],
                                    "text": "/"
                                },
                                {
                                    "type": "text",
                                    "text": " into an empty paragraph or by using the "
                                },
                                {
                                    "type": "text",
                                    "marks": [
                                        {
                                            "type": "bold"
                                        }
                                    ],
                                    "text": "+ Button"
                                },
                                {
                                    "type": "text",
                                    "text": " next to the drag handle"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "a086fd36-bd6f-4d39-8bde-6038a70a82af",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "A TextFormatting menu that allows you to change the "
                                },
                                {
                                    "type": "text",
                                    "marks": [
                                        {
                                            "type": "textStyle",
                                            "attrs": {
                                                "fontSize": "18px",
                                                "fontFamily": null,
                                                "color": null
                                            }
                                        }
                                    ],
                                    "text": "font size"
                                },
                                {
                                    "type": "text",
                                    "text": ", "
                                },
                                {
                                    "type": "text",
                                    "marks": [
                                        {
                                            "type": "bold"
                                        }
                                    ],
                                    "text": "font weight"
                                },
                                {
                                    "type": "text",
                                    "text": ", "
                                },
                                {
                                    "type": "text",
                                    "marks": [
                                        {
                                            "type": "textStyle",
                                            "attrs": {
                                                "fontSize": null,
                                                "fontFamily": "Georgia",
                                                "color": null
                                            }
                                        }
                                    ],
                                    "text": "font family"
                                },
                                {
                                    "type": "text",
                                    "text": ", "
                                },
                                {
                                    "type": "text",
                                    "marks": [
                                        {
                                            "type": "textStyle",
                                            "attrs": {
                                                "fontSize": null,
                                                "fontFamily": null,
                                                "color": "#b91c1c"
                                            }
                                        }
                                    ],
                                    "text": "color"
                                },
                                {
                                    "type": "text",
                                    "text": ", "
                                },
                                {
                                    "type": "text",
                                    "marks": [
                                        {
                                            "type": "highlight",
                                            "attrs": {
                                                "color": "#7e7922"
                                            }
                                        }
                                    ],
                                    "text": "highlight"
                                },
                                {
                                    "type": "text",
                                    "text": " and more"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "86cc4b49-d13c-4b04-83e0-a9e66c931c5c",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "A Table of Contents that can be viewed via clicking on the button on the top left corner"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "66beabad-8ee1-4af0-a6c9-168d42edb153",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Live collaboration including content synchronization and collaborative cursors"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "0d26bb02-02c8-4797-84cf-e8f2ac720e34",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "AI implementation with text and image generation and auto completion via the "
                                },
                                {
                                    "type": "text",
                                    "marks": [
                                        {
                                            "type": "code"
                                        }
                                    ],
                                    "text": "TAB"
                                },
                                {
                                    "type": "text",
                                    "text": " key."
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "type": "imageBlock",
            "attrs": {
                "src": "/placeholder-image.jpg",
                "width": "100%",
                "align": "center"
            }
        },
        {
            "type": "heading",
            "attrs": {
                "uid": "e9abb885-3a20-40fe-97af-664265187ee0",
                "id": "5c385629-c741-426d-9b15-ae0fb3b5c19b",
                "data-toc-id": "5c385629-c741-426d-9b15-ae0fb3b5c19b",
                "textAlign": "left",
                "level": 1
            },
            "content": [
                {
                    "type": "emoji",
                    "attrs": {
                        "name": "fire"
                    }
                },
                {
                    "type": "text",
                    "text": " Next.js + Tiptap Block Editor Template"
                }
            ]
        },
        {
            "type": "heading",
            "attrs": {
                "uid": "3e4f27eb-f391-427f-9737-4213c5c59779",
                "id": "becd1b81-5e85-465a-9ef3-5e214d0d91a1",
                "data-toc-id": "becd1b81-5e85-465a-9ef3-5e214d0d91a1",
                "textAlign": "left",
                "level": 2
            },
            "content": [
                {
                    "type": "text",
                    "text": "Get started"
                }
            ]
        },
        {
            "type": "paragraph",
            "attrs": {
                "uid": "5b68aa45-2b0f-45ac-bf80-95d3c1870347",
                "class": null,
                "textAlign": "left"
            },
            "content": [
                {
                    "type": "text",
                    "text": "To access our block editor template, simply head over to your "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "link",
                            "attrs": {
                                "href": "https://cloud.tiptap.dev/react-templates",
                                "target": "_blank",
                                "rel": "noopener noreferrer nofollow",
                                "class": null
                            }
                        }
                    ],
                    "text": "Tiptap Account"
                },
                {
                    "type": "text",
                    "text": " If you are not already a member, sign up for an account and complete the 2-minute React Template survey. Once finished, we will send you an invite to the private GitHub repository."
                }
            ]
        },
        {
            "type": "heading",
            "attrs": {
                "uid": "8bbaac12-0dd7-4b97-8c4a-585c09b0c006",
                "id": "f26013bb-b914-4ab5-83ec-ce5a4e4deef0",
                "data-toc-id": "f26013bb-b914-4ab5-83ec-ce5a4e4deef0",
                "textAlign": "left",
                "level": 2
            },
            "content": [
                {
                    "type": "text",
                    "text": "Installed extensions"
                }
            ]
        },
        {
            "type": "bulletList",
            "content": [
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "532cb073-70fc-46c9-ac32-3628596008f4",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap-pro/extension-ai"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "d8329b8f-b34c-440c-a2dd-f4b3e958bc48",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap-pro/extension-details"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "80299e0a-fb80-4c59-9466-b6ab2f51fe16",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap-pro/extension-details-content"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "c807e450-574e-427c-9505-9bbae9a404e4",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap-pro/extension-details-summary"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "8b3e85f0-9b4b-47ec-983e-1471bb3816a4",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap-pro/extension-drag-handle"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "fa24b45b-760c-4022-a0d5-e78d5646ac89",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap-pro/extension-drag-handle-react"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "374b7fa8-e7fd-4679-bfba-ce7f0cbc8cbd",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap-pro/extension-emoji"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "152ff0f8-bec2-4e9f-b6e3-de0e2614fe4b",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap-pro/extension-file-handler"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "47c323a6-b129-4a0f-b5cd-156c2ab84a96",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap-pro/extension-mathematics"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "31b90335-024c-4064-84b9-58759e43c054",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap-pro/extension-node-range"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "320f2269-f551-4e06-8004-bf66a491d654",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap-pro/extension-table-of-contents"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "2f65d6b9-9c68-4b0d-bb15-e186ebb5d9d8",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap-pro/extension-unique-id"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "6c003d2e-5b2a-4fd5-85be-577ba45216a8",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-bullet-list"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "1a71b4b1-c62f-4216-b42a-61aac21e7b53",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-character-count"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "b5b56800-6d2a-4fc1-8c1c-b956fe9bfea5",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-code-block"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "d3869cb6-d326-4cd3-80d7-0ebeff332048",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-code-block-lowlight"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "44317d27-4d5a-40fe-ba3a-a44d42ee3a4d",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-collaboration"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "8411254f-9733-4447-9dba-2e318b716a3a",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-collaboration-cursor"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "ef5ef5f5-483e-4987-9270-4dcf6a94a8e3",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-color"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "a9b9fd40-3208-49fa-b1e5-2edf00d63271",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-document"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "e2dc5c3d-a2fe-4fdc-8a73-1b942edee2d0",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-dropcursor"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "9f64525e-adc3-4170-8984-fb919d1ad3ed",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-focus"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "625993e2-ea45-411a-b34b-55596858b177",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-font-family"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "0f9ada78-4611-4951-8b0b-4dc89b0061da",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-heading"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "423d389e-b068-4757-a9c8-2b971da83ecf",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-highlight"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "37413d7a-43eb-4ca8-98cb-8c952bb4a599",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-horizontal-rule"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "93eb99bf-50ac-41f9-942a-62cd7e58b2d1",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-image"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "fd8ec4df-409e-48b1-a0cb-fcc1eb23612d",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-link"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "385af791-59b5-492d-94b8-7d96b1657171",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-ordered-list"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "0bd14a98-cd2f-49bb-ac97-24b62037d776",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-paragraph"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "29b2eafe-5143-4a1b-b783-8dff7d72e2db",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-placeholder"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "c083dd27-ff21-43b9-a9fb-97797253158c",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-subscript"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "40d094de-8d57-4c00-be85-0e07fc0e51af",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-superscript"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "4d35e07a-a789-4398-8231-84f70d748392",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-table"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "133bad56-b761-4a3d-8e3d-620a544562a3",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-table-header"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "c4429186-6408-41d9-a943-a7454f609d39",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-table-row"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "89ea89a1-be83-427b-8335-f8f66a5bba89",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-task-item"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "e75f844d-44bb-41df-a391-7ad8a6265f3d",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-task-list"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "b29508da-9cae-43d2-96ce-fb53a804e474",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-text-align"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "f043d42a-7b56-4030-bb3d-acd0e4beb1f6",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-text-style"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "1a41d941-84fd-41af-b3f9-1707d8f5590f",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-typography"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "uid": "c65aa57b-b2f5-4c07-bd3b-d2acfb53846f",
                                "class": null,
                                "textAlign": "left"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "@tiptap/extension-underline"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "type": "paragraph",
            "attrs": {
                "uid": "985c81f5-0138-4ebc-abce-31a1742c03b3",
                "class": null,
                "textAlign": "left"
            }
        }
    ]
}

// export const initialContent = {
//   type: 'doc',
//   content: [
//     {
//       type: 'heading',
//       attrs: {
//         textAlign: 'left',
//         level: 1,
//       },
//       content: [
//         {
//           type: 'emoji',
//           attrs: {
//             name: 'fire',
//           },
//         },
//         {
//           type: 'text',
//           text: ' Next.js + Tiptap Block Editor Template',
//         },
//       ],
//     },
//     {
//       type: 'paragraph',
//       attrs: {
//         class: null,
//         textAlign: 'left',
//       },
//       content: [
//         {
//           type: 'text',
//           text: 'Welcome to our React Block Editor Template built on top of ',
//         },
//         {
//           type: 'text',
//           marks: [
//             {
//               type: 'link',
//               attrs: {
//                 href: 'https://tiptap.dev/',
//                 target: '_blank',
//                 class: null,
//               },
//             },
//           ],
//           text: 'Tiptap',
//         },
//         {
//           type: 'text',
//           text: ', ',
//         },
//         {
//           type: 'text',
//           marks: [
//             {
//               type: 'link',
//               attrs: {
//                 href: 'https://nextjs.org/',
//                 target: '_blank',
//                 class: null,
//               },
//             },
//           ],
//           text: 'Next.js',
//         },
//         {
//           type: 'text',
//           text: ' and ',
//         },
//         {
//           type: 'text',
//           marks: [
//             {
//               type: 'link',
//               attrs: {
//                 href: 'https://tailwindcss.com/',
//                 target: '_blank',
//                 class: null,
//               },
//             },
//           ],
//           text: 'Tailwind',
//         },
//         {
//           type: 'text',
//           text: '. This project can be a good starting point for your own implementation of a block editor.',
//         },
//       ],
//     },
//     {
//       type: 'codeBlock',
//       attrs: {
//         language: null,
//       },
//       content: [
//         {
//           type: 'text',
//           text: "import { useEditor, EditorContent } from '@tiptap/react'\n\nfunction App() {\n  const editor = useEditor()\n\n  return <EditorContent editor={editor} />\n}",
//         },
//       ],
//     },
//     {
//       type: 'paragraph',
//       attrs: {
//         class: null,
//         textAlign: 'left',
//       },
//       content: [
//         {
//           type: 'text',
//           text: 'This editor includes features like:',
//         },
//       ],
//     },
//     {
//       type: 'bulletList',
//       content: [
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: 'A DragHandle including a DragHandle menu',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: 'A Slash menu that can be triggered via typing a ',
//                 },
//                 {
//                   type: 'text',
//                   marks: [
//                     {
//                       type: 'code',
//                     },
//                   ],
//                   text: '/',
//                 },
//                 {
//                   type: 'text',
//                   text: ' into an empty paragraph or by using the ',
//                 },
//                 {
//                   type: 'text',
//                   marks: [
//                     {
//                       type: 'bold',
//                     },
//                   ],
//                   text: '+ Button',
//                 },
//                 {
//                   type: 'text',
//                   text: ' next to the drag handle',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: 'A TextFormatting menu that allows you to change the ',
//                 },
//                 {
//                   type: 'text',
//                   marks: [
//                     {
//                       type: 'textStyle',
//                       attrs: {
//                         fontSize: '18px',
//                         fontFamily: null,
//                         color: null,
//                       },
//                     },
//                   ],
//                   text: 'font size',
//                 },
//                 {
//                   type: 'text',
//                   text: ', ',
//                 },
//                 {
//                   type: 'text',
//                   marks: [
//                     {
//                       type: 'bold',
//                     },
//                   ],
//                   text: 'font weight',
//                 },
//                 {
//                   type: 'text',
//                   text: ', ',
//                 },
//                 {
//                   type: 'text',
//                   marks: [
//                     {
//                       type: 'textStyle',
//                       attrs: {
//                         fontSize: null,
//                         fontFamily: 'Georgia',
//                         color: null,
//                       },
//                     },
//                   ],
//                   text: 'font family',
//                 },
//                 {
//                   type: 'text',
//                   text: ', ',
//                 },
//                 {
//                   type: 'text',
//                   marks: [
//                     {
//                       type: 'textStyle',
//                       attrs: {
//                         fontSize: null,
//                         fontFamily: null,
//                         color: '#b91c1c',
//                       },
//                     },
//                   ],
//                   text: 'color',
//                 },
//                 {
//                   type: 'text',
//                   text: ', ',
//                 },
//                 {
//                   type: 'text',
//                   marks: [
//                     {
//                       type: 'highlight',
//                       attrs: {
//                         color: '#7e7922',
//                       },
//                     },
//                   ],
//                   text: 'highlight',
//                 },
//                 {
//                   type: 'text',
//                   text: ' and more',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: 'A Table of Contents that can be viewed via clicking on the button on the top left corner',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: 'Live collaboration including content synchronization and collaborative cursors',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: 'AI implementation with text and image generation and auto completion via the ',
//                 },
//                 {
//                   type: 'text',
//                   marks: [
//                     {
//                       type: 'code',
//                     },
//                   ],
//                   text: 'TAB',
//                 },
//                 {
//                   type: 'text',
//                   text: ' key.',
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       type: 'imageBlock',
//       attrs: {
//         src: '/placeholder-image.jpg',
//         width: '100%',
//         align: 'center',
//       },
//     },
//     {
//       type: 'heading',
//       attrs: {
//         textAlign: 'left',
//         level: 2,
//       },
//       content: [
//         {
//           type: 'text',
//           text: 'Get started',
//         },
//       ],
//     },
//     {
//       type: 'paragraph',
//       attrs: {
//         class: null,
//         textAlign: 'left',
//       },
//       content: [
//         {
//           type: 'text',
//           text: 'To access our block editor template, simply head over to your ',
//         },
//         {
//           type: 'text',
//           marks: [
//             {
//               type: 'link',
//               attrs: {
//                 href: 'https://cloud.tiptap.dev/react-templates',
//                 target: '_blank',
//                 class: null,
//               },
//             },
//           ],
//           text: 'Tiptap Account',
//         },
//         {
//           type: 'text',
//           text: ' If you are not already a member, sign up for an account and complete the 2-minute React Template survey. Once finished, we will send you an invite to the private GitHub repository.',
//         },
//       ],
//     },
//     {
//       type: 'heading',
//       attrs: {
//         textAlign: 'left',
//         level: 2,
//       },
//       content: [
//         {
//           type: 'text',
//           text: 'Installed extensions',
//         },
//       ],
//     },
//     {
//       type: 'bulletList',
//       content: [
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap-pro/extension-ai',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap-pro/extension-details',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap-pro/extension-details-content',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap-pro/extension-details-summary',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap-pro/extension-drag-handle',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap-pro/extension-drag-handle-react',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap-pro/extension-emoji',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap-pro/extension-file-handler',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap-pro/extension-mathematics',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap-pro/extension-node-range',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap-pro/extension-table-of-contents',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap-pro/extension-unique-id',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-bullet-list',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-character-count',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-code-block',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-code-block-lowlight',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-collaboration',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-collaboration-cursor',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-color',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-document',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-dropcursor',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-focus',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-font-family',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-heading',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-highlight',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-horizontal-rule',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-image',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-link',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-ordered-list',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-paragraph',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-placeholder',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-subscript',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-superscript',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-table',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-table-header',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-table-row',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-task-item',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-task-list',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-text-align',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-text-style',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-typography',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'listItem',
//           content: [
//             {
//               type: 'paragraph',
//               attrs: {
//                 class: null,
//                 textAlign: 'left',
//               },
//               content: [
//                 {
//                   type: 'text',
//                   text: '@tiptap/extension-underline',
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       type: 'paragraph',
//       attrs: {
//         class: null,
//         textAlign: 'left',
//       },
//     },
//   ],
// }
