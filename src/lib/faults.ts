export type FaultCategory = "toilet" | "water_heater" | "water_supply" | "other";

export const FAULT_CATEGORY_OPTIONS: { value: FaultCategory; label: string }[] = [
  { value: "toilet", label: "便器の故障" },
  { value: "water_heater", label: "給湯器の故障" },
  { value: "water_supply", label: "水漏れ、給水関連の不調" },
  { value: "other", label: "その他・原因箇所不明" },
];

export interface FaultOption {
  id: string;
  label: string;
  /** MVP用のダミー金額(税抜)。実際は現地確認のうえ正式見積を提示する。 */
  price: number;
}

export interface FaultCategoryConfig {
  /** 対応方法(排他的)。ラジオボタンでいずれか1つを選ぶ。 */
  primaryOptions: FaultOption[];
  /** 追加で必要になりやすい作業(併発しうる)。チェックボックスで複数選択可。 */
  additionalOptions: FaultOption[];
  needsSurvey?: boolean;
  note: string;
}

export const FAULT_CONFIG: Record<FaultCategory, FaultCategoryConfig> = {
  toilet: {
    primaryOptions: [
      { id: "toilet-unclog", label: "便器の詰まり除去(排水管洗浄)", price: 10000 },
      { id: "toilet-replace", label: "便器本体の交換", price: 80000 },
    ],
    additionalOptions: [
      { id: "toilet-washlet", label: "ウォシュレットの交換", price: 40000 },
      { id: "toilet-pipe", label: "給水管・止水栓の交換", price: 8000 },
      { id: "toilet-disposal", label: "既存便器の処分費", price: 5000 },
      { id: "toilet-floor", label: "床下・床材の補修", price: 15000 },
    ],
    note: "選択した項目の金額を合算した概算です。実際の金額は現地確認後にご案内します。",
  },
  water_heater: {
    primaryOptions: [
      { id: "wh-repair", label: "部品交換・修理", price: 30000 },
      { id: "wh-replace", label: "給湯器本体の交換", price: 250000 },
    ],
    additionalOptions: [
      { id: "wh-disposal", label: "既設機器の撤去処分費", price: 10000 },
      { id: "wh-piping", label: "配管接続・延長工事", price: 20000 },
      { id: "wh-remote", label: "リモコンの交換", price: 15000 },
      { id: "wh-relocate", label: "設置場所の変更工事", price: 40000 },
    ],
    note: "選択した項目の金額を合算した概算です。実際の金額は現地確認後にご案内します。",
  },
  water_supply: {
    primaryOptions: [
      { id: "ws-packing", label: "パッキン・部品交換(軽微な修理)", price: 12000 },
      { id: "ws-pipe-replace", label: "配管の部分交換", price: 45000 },
    ],
    additionalOptions: [
      { id: "ws-stopcock", label: "止水栓の交換", price: 8000 },
      { id: "ws-pump", label: "ポンプの交換", price: 68000 },
      { id: "ws-floor", label: "床下点検・補修", price: 15000 },
      { id: "ws-survey", label: "漏水箇所の特定調査", price: 20000 },
    ],
    note: "選択した項目の金額を合算した概算です。実際の金額は現地確認後にご案内します。",
  },
  other: {
    primaryOptions: [
      { id: "other-quick-check", label: "簡易点検(目視・聞き取り)", price: 8000 },
      { id: "other-full-survey", label: "詳細現地調査(機器分解確認を含む)", price: 25000 },
    ],
    additionalOptions: [],
    needsSurvey: true,
    note: "原因箇所が特定できていないため、まずは調査費用の目安です。調査後にあらためて正式なお見積りをご案内します。",
  },
};
