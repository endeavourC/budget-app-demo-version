import { AppContainer } from "@/common/components";
import { checkAuth } from "@/lib/auth";

export default async function RootLayout({
  children,
  sidebar,
  modal,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode;
}) {
  await checkAuth();

  return (
    <main className="bg-background">
      <AppContainer>
        <AppContainer.Content>{children}</AppContainer.Content>
        <AppContainer.Aside>{sidebar}</AppContainer.Aside>
      </AppContainer>
      {modal}
    </main>
  );
}
