import { Nav } from "../ui/analysis/nav";


export default function AnalysisLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
        <body>
            <Nav />
            {children}
        </body>
        </html>
    );
}
