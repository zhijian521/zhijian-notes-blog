import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, BookOpen, Code2, Mail, Star } from 'lucide-react';

import { formatPostDate } from '@/lib/post-shared';
import { getPublishedPosts } from '@/lib/posts';
import styles from './page.module.css';

/*== 首页：按 Stitch 首页结构组织为全屏首屏、个人信息、最新文章和开源项目四个主区域。 ==*/
export default async function HomePage() {
    const posts = await getPublishedPosts();
    const latestPosts = posts.slice(0, 3);

    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <Image alt='山水留白背景' className={styles.heroBackground} fill priority sizes='100vw' src='/images/home-hero-bg.png' />
                <div className={styles.heroOverlay} />
                <div className={styles.heroContent}>
                    <div className={styles.heroAccent} />
                    <h1 className={styles.heroTitle}>
                        在字里行间，
                        <br />
                        寻找内心的宁静
                    </h1>
                    <p className={styles.heroCopy}>
                        探索简约生活的美学，记录关于设计、文化与个人成长的点滴思考。以文字为舟，渡至宁静之岸。
                    </p>
                    <Link className={styles.heroButton} href='#about-me'>
                        开始探索
                        <ArrowDown className='h-4 w-4' />
                    </Link>
                </div>
            </section>

            <div className={styles.content}>
                <section className={styles.section} id='about-me'>
                    <div className={styles.sectionHeading}>
                        <h2 className={styles.sectionTitle}>个人信息</h2>
                        <div className={styles.sectionLine} />
                    </div>

                    <div className={styles.profileCard}>
                        <div className={styles.avatarWrap}>
                            <div className={styles.avatarFrame}>
                                <Image alt='Lin Zhi' className={styles.avatar} fill sizes='160px' src='/images/admin-login-logo.png' />
                            </div>
                        </div>

                        <div className={styles.profileBody}>
                            <h3 className={styles.profileName}>Lin Zhi</h3>
                            <p className={styles.profileMeta}>设计师 / 撰稿人 / 开源爱好者</p>
                            <p className={styles.profileCopy}>
                                沉迷于网格与留白之间。致力于通过适度的设计语言和深度的文字思考，传递东方美学在现代数字生活中的应用价值。
                                我相信好的设计不仅是视觉的享受，更是内心的修行。
                            </p>
                            <div className={styles.profileLinks}>
                                <Link className={styles.inlineLink} href='mailto:hello@zhijian.site'>
                                    <Mail className='h-4 w-4' />
                                    联系我
                                </Link>
                                <Link className={styles.inlineLink} href='/blog'>
                                    <ArrowRight className='h-4 w-4' />
                                    个人主页
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionHeading}>
                        <h2 className={styles.sectionTitle}>最新文章</h2>
                        <div className={styles.sectionLine} />
                        <Link className={styles.sectionMore} href='/blog'>
                            查看全部
                            <ArrowRight className='h-4 w-4' />
                        </Link>
                    </div>

                    <div className={styles.postsGrid}>
                        {latestPosts.map((post, index) => (
                            <article className={index === 2 ? styles.textPostCard : styles.postCard} key={post.id}>
                                {index < 2 ? (
                                    <div className={styles.postMedia}>
                                        <div className={index === 0 ? styles.postVisualTea : styles.postVisualArchitecture} />
                                    </div>
                                ) : null}

                                <div className={styles.postBody}>
                                    <div className={styles.postMetaRow}>
                                        <span className={index === 2 ? styles.postMetaAccent : styles.postTag}>{resolveCategory(index)}</span>
                                        <span className={styles.postDate}>{formatPostDate(post.publishedAt)}</span>
                                    </div>
                                    <h3 className={styles.postTitle}>{resolveTitle(post.title, index)}</h3>
                                    <p className={styles.postSummary}>{resolveSummary(post.summary, index)}</p>
                                    <Link className={styles.readMore} href={`/blog/${post.slug}`}>
                                        阅读更多
                                        <ArrowRight className='h-4 w-4' />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionHeading}>
                        <h2 className={styles.sectionTitle}>开源项目</h2>
                        <div className={styles.sectionLine} />
                    </div>

                    <div className={styles.projectsGrid}>
                        <a className={styles.projectCard} href='https://github.com/' rel='noreferrer' target='_blank'>
                            <div className={styles.projectHeader}>
                                <div className={styles.projectTitleRow}>
                                    <Code2 className={styles.projectIcon} />
                                    <h3 className={styles.projectTitle}>zhijian-ui</h3>
                                </div>
                                <span className={styles.projectStars}>
                                    <Star className='h-3.5 w-3.5' />
                                    1.2k
                                </span>
                            </div>
                            <p className={styles.projectCopy}>基于 Tailwind CSS 的轻量级、新中式风格 React UI 组件库。专注于留白与排版美学。</p>
                            <div className={styles.projectTags}>
                                <span className={styles.projectTag}>TypeScript</span>
                                <span className={styles.projectTag}>React</span>
                            </div>
                        </a>

                        <a className={styles.projectCard} href='https://github.com/' rel='noreferrer' target='_blank'>
                            <div className={styles.projectHeader}>
                                <div className={styles.projectTitleRow}>
                                    <BookOpen className={styles.projectIcon} />
                                    <h3 className={styles.projectTitle}>minimal-blog-starter</h3>
                                </div>
                                <span className={styles.projectStars}>
                                    <Star className='h-3.5 w-3.5' />
                                    850
                                </span>
                            </div>
                            <p className={styles.projectCopy}>使用 Next.js 和 MDX 构建的极简主义博客启动器，内置 SEO 优化和深色模式。</p>
                            <div className={styles.projectTags}>
                                <span className={styles.projectTag}>Next.js</span>
                                <span className={styles.projectTag}>MDX</span>
                            </div>
                        </a>
                    </div>
                </section>
            </div>
        </main>
    );
}

function resolveCategory(index: number): string {
    return ['生活方式', '设计札记', '文化随笔'][index] || '阅读札记';
}

function resolveTitle(title: string, index: number): string {
    const titles = ['茶道与留白的美学', '秩序之美：网格系统的力量', '《考工记》与现代工艺精神'];
    return titles[index] || title;
}

function resolveSummary(summary: string, index: number): string {
    const summaries = [
        '在喧嚣的现代生活中，泡一壶清茶，体会杯盏间的留白。这不仅仅是一种饮品，更是一种减法生活的哲学实践。',
        '探讨如何通过严谨的网格系统在数字设计中建立秩序感。和谐的视觉比例能够引导用户的视线，传递品牌的沉稳与专业。',
        '“天有时，地有气，材有美，工有巧，合此四者，然后可以为良。”重读古代造物典籍，寻找属于这个时代的工匠精神回归之路。',
    ];

    return summaries[index] || summary;
}
