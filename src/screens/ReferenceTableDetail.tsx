import React from "react";
import {
  Badge,
  Button,
  Divider,
  Input,
  makeStyles,
  tokens,
  Text,
  Title2,
  Subtitle2,
  Caption1,
  Tab,
  TabList
} from "@fluentui/react-components";
import { ArrowLeft24Regular, Edit24Regular, Search24Regular } from "@fluentui/react-icons";
import { useNavigate, useParams } from "react-router-dom";
import { referenceTables } from "../data/referenceTables";

const useStyles = makeStyles({
  topBar: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" },
  header: { display: "flex", justifyContent: "space-between", gap: "16px", marginBottom: "10px" },
  headerLeft: { display: "flex", flexDirection: "column", gap: "6px" },
  pills: { display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" },
  grid: {
    marginTop: "14px",
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr",
    gap: "14px",
    alignItems: "start"
  },
  panel: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: "14px",
    backgroundColor: tokens.colorNeutralBackground1
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  th: {
    textAlign: "left",
    padding: "10px 8px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    color: tokens.colorNeutralForeground3
  },
  td: {
    padding: "10px 8px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`
  }
});

function statusBadge(status: string) {
  switch (status) {
    case "Active":
      return (
        <Badge appearance="filled" color="success">
          {status}
        </Badge>
      );
    case "Draft":
      return (
        <Badge appearance="filled" color="warning">
          {status}
        </Badge>
      );
    default:
      return <Badge appearance="outline">{status}</Badge>;
  }
}

export function ReferenceTableDetail() {
  const styles = useStyles();
  const nav = useNavigate();
  const { id } = useParams();

  const t = referenceTables.find((x) => x.id === id) ?? referenceTables[0];

  return (
    <>
      <div className={styles.topBar}>
        <Button icon={<ArrowLeft24Regular />} appearance="subtle" onClick={() => nav("/reference-tables")}>
          Back
        </Button>
        <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
          Reference tables / {t.domain}
        </Text>
      </div>

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Title2>{t.name}</Title2>
          <Text size={300} style={{ color: tokens.colorNeutralForeground3 }}>
            {t.description}
          </Text>
          <div className={styles.pills}>
            {statusBadge(t.status)}
            <Caption1>Owner: {t.owner}</Caption1>
            <Caption1>Last updated: {t.lastUpdated}</Caption1>
            <Caption1>Rows: {t.rowCount.toLocaleString()}</Caption1>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
          <Button icon={<Edit24Regular />} appearance="primary" onClick={() => nav(`/admin/reference-tables/${t.id}/edit`)}>
            Edit
          </Button>
        </div>
      </div>

      <Divider />

      <div style={{ marginTop: 10 }}>
        <TabList defaultSelectedValue="data">
          <Tab value="data">Data</Tab>
          <Tab value="schema">Schema</Tab>
          <Tab value="governance">Governance</Tab>
          <Tab value="changes">Change log</Tab>
        </TabList>
      </div>

      <div className={styles.grid}>
        <section className={styles.panel}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", marginBottom: 12 }}>
            <Subtitle2>Preview</Subtitle2>
            <Input contentBefore={<Search24Regular />} placeholder="Search values…" />
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Source system</th>
                <th className={styles.th}>Source value</th>
                <th className={styles.th}>Canonical / Target</th>
                <th className={styles.th}>Valid from</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.td}>ERP</td>
                <td className={styles.td}>GER</td>
                <td className={styles.td}>DE</td>
                <td className={styles.td}>2024-01-01</td>
              </tr>
              <tr>
                <td className={styles.td}>CRM</td>
                <td className={styles.td}>Deutschland</td>
                <td className={styles.td}>DE</td>
                <td className={styles.td}>2024-01-01</td>
              </tr>
              <tr>
                <td className={styles.td}>Files</td>
                <td className={styles.td}>UK</td>
                <td className={styles.td}>GB</td>
                <td className={styles.td}>2023-06-01</td>
              </tr>
            </tbody>
          </table>
        </section>

        <aside className={styles.panel}>
          <Subtitle2>Definition</Subtitle2>
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: "10px" }}>
            <div>
              <Caption1 style={{ color: tokens.colorNeutralForeground3 }}>Primary keys</Caption1>
              <Text>{t.keys.join(", ")}</Text>
            </div>
            <div>
              <Caption1 style={{ color: tokens.colorNeutralForeground3 }}>Recommended columns</Caption1>
              <Text>is_active, priority, valid_from, valid_to, created_at, created_by, change_reason</Text>
            </div>
            <div>
              <Caption1 style={{ color: tokens.colorNeutralForeground3 }}>Usage hints</Caption1>
              <Text>
                Prefer deterministic mappings first, then normalization aliases. Use effective dating for auditability and safe rollouts.
              </Text>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
