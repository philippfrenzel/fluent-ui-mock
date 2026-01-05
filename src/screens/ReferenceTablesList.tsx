import React from "react";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Input,
  makeStyles,
  tokens,
  Text,
  Title2,
  Caption1,
  Dropdown,
  Option
} from "@fluentui/react-components";
import { Search24Regular, Filter24Regular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { referenceTables } from "../data/referenceTables";

const useStyles = makeStyles({
  headerRow: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "16px"
  },
  left: { display: "flex", flexDirection: "column", gap: "6px" },
  right: { display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(360px, 1fr))",
    gap: "14px"
  },
  card: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    cursor: "pointer"
  },
  metaRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    color: tokens.colorNeutralForeground3
  },
  footerRow: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
    color: tokens.colorNeutralForeground3
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

export function ReferenceTablesList() {
  const styles = useStyles();
  const nav = useNavigate();

  return (
    <>
      <div className={styles.headerRow}>
        <div className={styles.left}>
          <Title2>Reference tables</Title2>
          <Text size={300} style={{ color: tokens.colorNeutralForeground3 }}>
            Centralized lookups for deterministic mappings, normalization, hierarchies, and context-driven rules.
          </Text>
        </div>

        <div className={styles.right}>
          <Input contentBefore={<Search24Regular />} placeholder="Search tables…" />
          <Dropdown placeholder="Domain" style={{ minWidth: 160 }}>
            <Option value="All">All</Option>
            <Option value="Geography">Geography</Option>
            <Option value="CRM">CRM</Option>
            <Option value="Finance">Finance</Option>
            <Option value="MDM">MDM</Option>
          </Dropdown>
          <Button icon={<Filter24Regular />}>Filters</Button>
          <Button appearance="primary" onClick={() => nav("/admin/reference-tables/country_codes/edit")}>
            Create / Edit
          </Button>
        </div>
      </div>

      <div className={styles.grid}>
        {referenceTables.map((t) => (
          <Card key={t.id} className={styles.card} onClick={() => nav(`/reference-tables/${t.id}`)}>
            <CardHeader
              header={<Text weight="semibold">{t.name}</Text>}
              description={
                <div className={styles.metaRow}>
                  <Caption1>{t.domain}</Caption1>
                  <Caption1>Owner: {t.owner}</Caption1>
                  <Caption1>Updated: {t.lastUpdated}</Caption1>
                  {statusBadge(t.status)}
                </div>
              }
            />
            <Text size={300}>{t.description}</Text>
            <div className={styles.footerRow}>
              <Caption1>Rows: {t.rowCount.toLocaleString()}</Caption1>
              <Caption1>Keys: {t.keys.join(", ")}</Caption1>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
