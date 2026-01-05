import React from "react";
import {
  Button,
  Divider,
  makeStyles,
  tokens,
  Text,
  Link,
  Subtitle2
} from "@fluentui/react-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Home24Regular, Table24Regular, Settings24Regular, Open24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  shell: {
    height: "100vh",
    display: "grid",
    gridTemplateColumns: "280px 1fr",
    backgroundColor: tokens.colorNeutralBackground1
  },
  nav: {
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  brand: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    paddingBottom: "8px"
  },
  navSection: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  content: {
    padding: "20px 28px",
    overflow: "auto"
  },
  navButton: {
    justifyContent: "flex-start"
  },
  footer: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  }
});

export function AppLayout({ children }: { children: React.ReactNode }) {
  const styles = useStyles();
  const nav = useNavigate();
  const loc = useLocation();

  const isActive = (prefix: string) => loc.pathname.startsWith(prefix);

  return (
    <div className={styles.shell}>
      <aside className={styles.nav}>
        <div className={styles.brand}>
          <Subtitle2>Mapping Service</Subtitle2>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
            Reference Tables (Fluent UI mocks)
          </Text>
        </div>

        <Divider />

        <div className={styles.navSection}>
          <Button
            className={styles.navButton}
            appearance={isActive("/reference-tables") ? "primary" : "subtle"}
            icon={<Table24Regular />}
            onClick={() => nav("/reference-tables")}
          >
            Reference tables
          </Button>

          <Button
            className={styles.navButton}
            appearance={isActive("/admin") ? "primary" : "subtle"}
            icon={<Settings24Regular />}
            onClick={() => nav("/admin/reference-tables/country_codes/edit")}
          >
            Admin / Edit
          </Button>

          <Button
            className={styles.navButton}
            appearance="subtle"
            icon={<Home24Regular />}
            onClick={() => nav("/reference-tables")}
          >
            Home
          </Button>
        </div>

        <div className={styles.footer}>
          <Divider />
          <Link
            href="https://github.com/philippfrenzel/msfabric-mapping-etk"
            target="_blank"
            rel="noreferrer"
          >
            View repository <Open24Regular style={{ verticalAlign: "middle" }} />
          </Link>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
            Plain Fluent (webLightTheme)
          </Text>
        </div>
      </aside>

      <main className={styles.content}>{children}</main>
    </div>
  );
}
