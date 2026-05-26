/*== 首页加载骨架 ==*/
export default function Loading() {
    return (
        <main style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#fbf9f9' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--muted-foreground)' }}>加载中...</span>
        </main>
    );
}
