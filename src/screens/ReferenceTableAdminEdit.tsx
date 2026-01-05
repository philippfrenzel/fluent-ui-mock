import React from "react";
import {
  Button,
  Divider,
  Field,
  Input,
  Label,
  makeStyles,
  tokens,
  Text,
  Textarea,
  Title2,
  Subtitle2,
  Dropdown,
  Option,
  Switch,
  Badge
} from "@fluentui/react-components";
import { Save24Regular, ArrowLeft24Regular, Delete24Regular, Add24Regular } from "@fluentui/react-icons";
import { useNavigate, useParams } from "react-router-dom";
import { referenceTables } from "../data/referenceTables";

const useStyles = makeStyles({
  topBar: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "12px" },
  grid: {
    marginTop: "14px",
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: "14px",
    alignItems: "start"
  },
  panel: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: "14px",
    backgroundColor: tokens.colorNeutralBackground1
  },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  keyChips: { display: "flex", gap: "8px", flexWrap: "wrap" }
});

export function ReferenceTableAdminEdit() {
  const styles = useStyles();
  const nav = useNavigate();
  const { id } = useParams();

  const t = referenceTables.find((x) => x.id === id) ?? referenceTables[0];

  return (
    <>
      <div className={styles.topBar}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Button icon={<ArrowLeft24Regular />} appearance="subtle" onClick={() => nav(`/reference-tables/${t.id}`)}>
            Back
          </Button>
          <div>
            <Title2>Admin / Edit</Title2>
            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
              Manage schema, governance, and mapping rows for: <strong>{t.name}</strong>
            </Text>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <Button appearance="subtle" icon={<Delete24Regular />}>
            Deprecate
          </Button>
          <Button appearance="primary" icon={<Save24Regular />}>
            Save changes
          </Button>
        </div>
      </div>

      <Divider />

      <div className={styles.grid}>
        <section className={styles.panel}>
          <Subtitle2>Metadata</Subtitle2>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
            <div className={styles.row}>
              <Field label="Table name">
                <Input defaultValue={t.name} />
              </Field>
              <Field label="Domain">
                <Dropdown defaultSelectedOptions={[t.domain]}>
                  <Option value="Geography">Geography</Option>
                  <Option value="CRM">CRM</Option>
                  <Option value="Finance">Finance</Option>
                  <Option value="MDM">MDM</Option>
                </Dropdown>
              </Field>
            </div>

            <div className={styles.row}>
              <Field label="Owner">
                <Input defaultValue={t.owner} />
              </Field>
              <Field label="Status">
                <Dropdown defaultSelectedOptions={[t.status]}>
                  <Option value="Active">Active</Option>
                  <Option value="Draft">Draft</Option>
                  <Option value="Deprecated">Deprecated</Option>
                </Dropdown>
              </Field>
            </div>

            <Field label="Description">
              <Textarea defaultValue={t.description} resize="vertical" />
            </Field>

            <div className={styles.row}>
              <Field label="Valid from">
                <Input defaultValue="2024-01-01" />
              </Field>
              <Field label="Valid to">
                <Input defaultValue="" placeholder="(open ended)" />
              </Field>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <Switch defaultChecked label="Require approval for changes" />
                <Switch defaultChecked label="Enable effective dating" />
              </div>
              <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                Governance controls influence publishing & audit trails.
              </Text>
            </div>
          </div>
        </section>

        <aside className={styles.panel}>
          <Subtitle2>Schema & keys</Subtitle2>

          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <Label>Primary keys</Label>
              <div className={styles.keyChips} style={{ marginTop: 8 }}>
                {t.keys.map((k) => (
                  <Badge key={k} appearance="outline">
                    {k}
                  </Badge>
                ))}
                <Button size="small" icon={<Add24Regular />}>
                  Add key
                </Button>
              </div>
            </div>

            <Divider />

            <div>
              <Label>Recommended columns</Label>
              <Text style={{ marginTop: 6, display: "block" }}>
                is_active, priority, valid_from, valid_to, created_at, created_by, change_reason
              </Text>
            </div>

            <Divider />

            <div>
              <Label>Publishing</Label>
              <Text style={{ marginTop: 6, display: "block", color: tokens.colorNeutralForeground3 }}>
                Draft changes can be validated and promoted to Active with an approval step.
              </Text>
              <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
                <Button appearance="subtle">Validate</Button>
                <Button appearance="primary">Publish</Button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
