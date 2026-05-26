/*== 文章列表加载骨架 ==*/
export default function Loading() {
    return (
        <main style={{ maxWidth: '80rem', margin: '0 auto', padding: '4rem 1.5rem', background: '#fbf9f9' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--muted-foreground)' }}>加载中...</span>
        </main>
    );
}
