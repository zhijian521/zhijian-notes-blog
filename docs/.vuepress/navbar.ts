import { defineNavbarConfig } from "vuepress-theme-plume";

export const navbar = defineNavbarConfig([
  { text: "首页", link: "/", icon: "material-symbols:home" },
  { text: "博客", link: "/blog/", icon: "material-symbols:notes" },
  {
    text: "Web前端",
    icon: "icon-park-twotone:web-page",
    items: [
      { text: "HTML", link: "/HTML/ckjutl0h/", icon: "ph:file-html-fill" },
      { text: "CSS", link: "/CSS/b3trdf6x/", icon: "fa6-brands:css" },
      { text: "JavaScript", link: "/JavaScript/3n85m43u/", icon: "cib:js" },
      {
        text: "TypeScript",
        link: "/TypeScript/xgndo7cj/",
        icon: "skill-icons:typescript",
      },
      { text: "Vue2", link: "/Vue2/amnf6e15/", icon: "logos:vue" },
      { text: "Vue3", link: "/Vue3/wr2boutf/", icon: "devicon:vuetify" },
      { text: "React", link: "/React/jpzwki32/", icon: "devicon:react" },
      {
        text: "Node.js",
        link: "/Node.js/cznd3edy/",
        icon: "teenyicons:nodejs-solid",
      },
      {
        text: "计算机基础",
        link: "/Computer/r8g2shzj/",
        icon: "material-symbols:computer",
      },
    ],
  },
  {
    text: "插件&工具",
    icon: "fluent:window-dev-tools-16-filled",
    items: [
      { text: "NPM", link: "/NPM/b54c2715/", icon: "gg:npm" },
      { text: "Git", link: "/Git/h8hjd37u/", icon: "mdi:git" },
      { text: "InterView", link: "/InterView/bdk24mw0/", icon: "mdi:notes" },
      { text: "SoftTest", link: "/SoftTest/q5jikepi/", icon: "mdi:notes" },
    ],
  },
  {
    text: "新站[yuwb.dev]",
    link: "https://yuwb.dev",
    icon: "material-symbols:rocket-launch",
  },
]);
