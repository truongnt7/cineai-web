"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Clapperboard,
  Film,
  LayoutDashboard,
  LogOut,
  Save,
  Sparkles,
  Tags,
  Users,
} from "lucide-react";
import { defaultLocale, localeMeta, locales, type Locale } from "@/lib/i18n";
import type { SiteContent } from "@/lib/types";

type Tab = "hero" | "products" | "showcase" | "pricing" | "partners";

const tabs: { id: Tab; label: string; icon: typeof Film }[] = [
  { id: "hero", label: "Hero", icon: Sparkles },
  { id: "products", label: "Sản phẩm", icon: Clapperboard },
  { id: "showcase", label: "Showcase", icon: Film },
  { id: "pricing", label: "Bảng giá", icon: Tags },
  { id: "partners", label: "Partners", icon: Users },
];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [tab, setTab] = useState<Tab>("hero");
  const [saving, setSaving] = useState(false);
  const [loadingLocale, setLoadingLocale] = useState(false);
  const [message, setMessage] = useState("");

  async function loadContent(nextLocale: Locale) {
    const res = await fetch(`/api/content?locale=${nextLocale}`);
    const data = (await res.json()) as { content: SiteContent; locale: Locale };
    setContent(data.content);
    setLocale(data.locale);
  }

  useEffect(() => {
    async function boot() {
      try {
        const authRes = await fetch("/api/auth");
        const auth = (await authRes.json()) as { authenticated: boolean };
        await loadContent(defaultLocale);
        setAuthed(Boolean(auth.authenticated));
      } catch {
        setError("Không tải được nội dung CMS.");
      } finally {
        setChecking(false);
      }
    }
    void boot();
  }, []);

  const partnersText = useMemo(
    () => content?.partners.items.map((item) => item.name).join("\n") ?? "",
    [content],
  );

  async function switchLocale(next: Locale) {
    if (next === locale) return;
    setLoadingLocale(true);
    setMessage("");
    try {
      await loadContent(next);
    } finally {
      setLoadingLocale(false);
    }
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setError("Mật khẩu không đúng.");
      return;
    }
    setAuthed(true);
  }

  async function logout() {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    setAuthed(false);
  }

  async function save() {
    if (!content) return;
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale, content }),
    });
    setSaving(false);
    if (!res.ok) {
      setMessage("Lưu thất bại. Hãy đăng nhập lại.");
      return;
    }
    setMessage(`Đã lưu bản ${localeMeta[locale].nativeLabel}. Mở /${locale} để xem.`);
  }

  if (checking) {
    return (
      <div className="grid min-h-screen place-items-center bg-bg text-text-muted">
        Đang tải CMS…
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="grid min-h-screen place-items-center bg-bg px-4">
        <form
          onSubmit={login}
          className="w-full max-w-md rounded-3xl border border-line bg-bg-panel p-8 shadow-[0_0_60px_rgba(200,255,0,0.06)]"
        >
          <div className="mb-6 flex items-center gap-3">
            <LayoutDashboard className="h-6 w-6 text-brand" />
            <div>
              <h1 className="font-display text-2xl font-bold text-white">CineAI CMS</h1>
              <p className="text-sm text-text-muted">Quản trị nội dung website</p>
            </div>
          </div>
          <label className="mb-2 block text-sm text-text-muted">Mật khẩu admin</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full rounded-xl border border-line bg-bg px-4 py-3 text-white outline-none focus:border-brand/50"
            placeholder="Nhập mật khẩu"
          />
          {error && <p className="mb-3 text-sm text-red-400">{error}</p>}
          <button type="submit" className="btn-primary w-full">
            Đăng nhập
          </button>
          <p className="mt-4 text-center text-xs text-text-muted">
            Mặc định: <code className="text-brand">cineai2026</code>
          </p>
          <a href="/" className="mt-4 block text-center text-sm text-white/60 hover:text-brand">
            ← Về trang chủ
          </a>
        </form>
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="min-h-screen bg-bg text-white">
      <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-5 w-5 text-brand" />
            <div>
              <p className="font-display text-lg font-bold">CineAI CMS</p>
              <p className="text-xs text-text-muted">
                Đang sửa: {localeMeta[locale].nativeLabel}
                {loadingLocale ? "…" : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href={`/${locale}`} className="btn-secondary text-sm">
              Xem /{locale}
            </a>
            <button type="button" onClick={save} className="btn-primary text-sm" disabled={saving}>
              <Save className="h-4 w-4" />
              {saving ? "Đang lưu…" : "Lưu thay đổi"}
            </button>
            <button
              type="button"
              onClick={logout}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-white/70 hover:text-brand"
              aria-label="Đăng xuất"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-4">
          {locales.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => void switchLocale(item)}
              disabled={loadingLocale}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                locale === item
                  ? "bg-brand text-black"
                  : "border border-line text-white/70 hover:border-brand/40 hover:text-brand"
              }`}
            >
              {localeMeta[item].short} · {localeMeta[item].nativeLabel}
            </button>
          ))}
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-2xl border border-line bg-bg-panel p-3">
          {tabs.map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`mb-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                  active ? "bg-brand text-black font-semibold" : "text-white/70 hover:bg-white/5"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </aside>

        <section className="rounded-2xl border border-line bg-bg-panel p-5 sm:p-6">
          {message && (
            <p className="mb-4 rounded-xl border border-brand/30 bg-brand/10 px-4 py-3 text-sm text-brand">
              {message}
            </p>
          )}

          {tab === "hero" && (
            <div className="space-y-4">
              <Field
                label="Headline"
                value={content.hero.headline}
                onChange={(value) =>
                  setContent({ ...content, hero: { ...content.hero, headline: value } })
                }
                multiline
              />
              <Field
                label="Subheadline"
                value={content.hero.subheadline}
                onChange={(value) =>
                  setContent({ ...content, hero: { ...content.hero, subheadline: value } })
                }
                multiline
              />
              <Field
                label="CTA chính"
                value={content.hero.primaryCta}
                onChange={(value) =>
                  setContent({ ...content, hero: { ...content.hero, primaryCta: value } })
                }
              />
              <Field
                label="CTA phụ"
                value={content.hero.secondaryCta}
                onChange={(value) =>
                  setContent({ ...content, hero: { ...content.hero, secondaryCta: value } })
                }
              />
              <Field
                label="Bubble"
                value={content.hero.bubble}
                onChange={(value) =>
                  setContent({ ...content, hero: { ...content.hero, bubble: value } })
                }
              />
              <div className="grid gap-3 sm:grid-cols-3">
                {content.hero.stats.map((stat, index) => (
                  <div key={stat.label} className="rounded-xl border border-line p-3">
                    <Field
                      label={`Stat ${index + 1} value`}
                      value={stat.value}
                      onChange={(value) => {
                        const stats = [...content.hero.stats];
                        stats[index] = { ...stats[index], value };
                        setContent({ ...content, hero: { ...content.hero, stats } });
                      }}
                    />
                    <Field
                      label="Label"
                      value={stat.label}
                      onChange={(value) => {
                        const stats = [...content.hero.stats];
                        stats[index] = { ...stats[index], label: value };
                        setContent({ ...content, hero: { ...content.hero, stats } });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "products" && (
            <div className="space-y-6">
              {content.products.map((product, index) => (
                <div key={product.id} className="rounded-xl border border-line p-4">
                  <h3 className="mb-3 font-display text-lg font-bold">{product.name}</h3>
                  <Field
                    label="Tên sản phẩm"
                    value={product.name}
                    onChange={(value) => {
                      const products = [...content.products];
                      products[index] = { ...products[index], name: value };
                      setContent({ ...content, products });
                    }}
                  />
                  <Field
                    label="Mô tả"
                    value={product.description}
                    onChange={(value) => {
                      const products = [...content.products];
                      products[index] = { ...products[index], description: value };
                      setContent({ ...content, products });
                    }}
                    multiline
                  />
                  <Field
                    label="Features (mỗi dòng một mục)"
                    value={product.features.map((f) => f.title).join("\n")}
                    onChange={(value) => {
                      const products = [...content.products];
                      products[index] = {
                        ...products[index],
                        features: value
                          .split("\n")
                          .map((line) => line.trim())
                          .filter(Boolean)
                          .map((title) => ({ title })),
                      };
                      setContent({ ...content, products });
                    }}
                    multiline
                  />
                </div>
              ))}
            </div>
          )}

          {tab === "showcase" && (
            <div className="space-y-4">
              <Field
                label="Headline showcase"
                value={content.showcase.headline}
                onChange={(value) =>
                  setContent({
                    ...content,
                    showcase: { ...content.showcase, headline: value },
                  })
                }
              />
              <Field
                label="Categories (phân tách bằng dấu phẩy)"
                value={content.showcase.categories.join(", ")}
                onChange={(value) =>
                  setContent({
                    ...content,
                    showcase: {
                      ...content.showcase,
                      categories: value
                        .split(",")
                        .map((item) => item.trim())
                        .filter(Boolean),
                    },
                  })
                }
              />
              {content.showcase.items.map((item, index) => (
                <div key={item.id} className="rounded-xl border border-line p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-brand">Video #{index + 1}</p>
                    <button
                      type="button"
                      className="text-xs text-red-400 hover:underline"
                      onClick={() => {
                        const items = content.showcase.items.filter((_, i) => i !== index);
                        setContent({
                          ...content,
                          showcase: { ...content.showcase, items },
                        });
                      }}
                    >
                      Xóa
                    </button>
                  </div>
                  <Field
                    label="Tiêu đề"
                    value={item.title}
                    onChange={(value) => {
                      const items = [...content.showcase.items];
                      items[index] = { ...items[index], title: value };
                      setContent({
                        ...content,
                        showcase: { ...content.showcase, items },
                      });
                    }}
                  />
                  <Field
                    label="Category"
                    value={item.category}
                    onChange={(value) => {
                      const items = [...content.showcase.items];
                      items[index] = { ...items[index], category: value };
                      setContent({
                        ...content,
                        showcase: { ...content.showcase, items },
                      });
                    }}
                  />
                  <Field
                    label="Thumbnail URL"
                    value={item.thumbnail}
                    onChange={(value) => {
                      const items = [...content.showcase.items];
                      items[index] = { ...items[index], thumbnail: value };
                      setContent({
                        ...content,
                        showcase: { ...content.showcase, items },
                      });
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                className="btn-secondary text-sm"
                onClick={() => {
                  setContent({
                    ...content,
                    showcase: {
                      ...content.showcase,
                      items: [
                        ...content.showcase.items,
                        {
                          id: `v${Date.now()}`,
                          title: "Video mới",
                          category: "Tất cả",
                          thumbnail:
                            "https://images.unsplash.com/photo-1485846234645-a62644f84781?auto=format&fit=crop&w=800&q=80",
                        },
                      ],
                    },
                  });
                }}
              >
                + Thêm video
              </button>
            </div>
          )}

          {tab === "pricing" && (
            <div className="space-y-4">
              <Field
                label="Headline"
                value={content.pricing.headline}
                onChange={(value) =>
                  setContent({
                    ...content,
                    pricing: { ...content.pricing, headline: value },
                  })
                }
              />
              {content.pricing.plans.map((plan, index) => (
                <div key={plan.id} className="rounded-xl border border-line p-4">
                  <h3 className="mb-3 font-display text-lg font-bold">{plan.name}</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Giá tháng ($)"
                      value={String(plan.priceMonthly)}
                      onChange={(value) => {
                        const plans = [...content.pricing.plans];
                        plans[index] = {
                          ...plans[index],
                          priceMonthly: Number(value) || 0,
                        };
                        setContent({
                          ...content,
                          pricing: { ...content.pricing, plans },
                        });
                      }}
                    />
                    <Field
                      label="Giá năm ($/tháng)"
                      value={String(plan.priceYearly)}
                      onChange={(value) => {
                        const plans = [...content.pricing.plans];
                        plans[index] = {
                          ...plans[index],
                          priceYearly: Number(value) || 0,
                        };
                        setContent({
                          ...content,
                          pricing: { ...content.pricing, plans },
                        });
                      }}
                    />
                  </div>
                  <Field
                    label="Mô tả"
                    value={plan.description}
                    onChange={(value) => {
                      const plans = [...content.pricing.plans];
                      plans[index] = { ...plans[index], description: value };
                      setContent({
                        ...content,
                        pricing: { ...content.pricing, plans },
                      });
                    }}
                    multiline
                  />
                  <Field
                    label="Features (mỗi dòng một mục)"
                    value={plan.features.join("\n")}
                    onChange={(value) => {
                      const plans = [...content.pricing.plans];
                      plans[index] = {
                        ...plans[index],
                        features: value
                          .split("\n")
                          .map((line) => line.trim())
                          .filter(Boolean),
                      };
                      setContent({
                        ...content,
                        pricing: { ...content.pricing, plans },
                      });
                    }}
                    multiline
                  />
                </div>
              ))}
            </div>
          )}

          {tab === "partners" && (
            <div className="space-y-4">
              <Field
                label="Label"
                value={content.partners.label}
                onChange={(value) =>
                  setContent({
                    ...content,
                    partners: { ...content.partners, label: value },
                  })
                }
              />
              <Field
                label="Danh sách partner (mỗi dòng một tên)"
                value={partnersText}
                onChange={(value) =>
                  setContent({
                    ...content,
                    partners: {
                      ...content.partners,
                      items: value
                        .split("\n")
                        .map((line) => line.trim())
                        .filter(Boolean)
                        .map((name) => ({ name })),
                    },
                  })
                }
                multiline
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  const className =
    "mt-1 w-full rounded-xl border border-line bg-bg px-3 py-2.5 text-sm text-white outline-none focus:border-brand/40";

  return (
    <label className="mb-3 block">
      <span className="text-xs font-medium tracking-wide text-text-muted uppercase">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${className} min-h-24`}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={className}
        />
      )}
    </label>
  );
}
