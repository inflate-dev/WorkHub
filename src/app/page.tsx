import { PageHero } from "@/components/page-hero";
import { EstimateForm } from "@/components/estimate-form";

export default function Home() {
  return (
    <div>
      <PageHero title="かんたん見積" description="故障内容を選ぶだけで、その場で概算のお見積りが確認できます。" />
      <div className="mx-auto max-w-4xl px-6 pt-8 pb-16">
        <EstimateForm />
      </div>
    </div>
  );
}
