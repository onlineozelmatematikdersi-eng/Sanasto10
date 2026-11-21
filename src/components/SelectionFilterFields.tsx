import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import CategoryFilterField from '@/components/CategoryFilterField';
import LearningStatusField from '@/components/LearningStatusField';
import type { Category, Word } from '@/lib/vocabulary';
import type { WordSelectionFilters } from '@/lib/wordFilters';

export interface SelectionToggle {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

interface SelectionFilterFieldsProps {
  categoryLabel: string;
  categories: Category[];
  words: Word[];
  filters: WordSelectionFilters;
  onChange: (patch: Partial<WordSelectionFilters>) => void;
  toggles: SelectionToggle[];
  hideCategoryFilter?: boolean;
}

export default function SelectionFilterFields({
  categoryLabel,
  categories,
  words,
  filters,
  onChange,
  toggles,
  hideCategoryFilter = false,
}: SelectionFilterFieldsProps) {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className={`grid gap-3 ${hideCategoryFilter ? '' : 'lg:grid-cols-2'}`}>
        {!hideCategoryFilter && (
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <button
              type="button"
              aria-expanded={categoryOpen}
              onClick={() => setCategoryOpen((open) => !open)}
              className="flex w-full items-center justify-between gap-3 bg-sky-100/70 px-4 py-4 text-left text-sm font-bold text-slate-900 transition hover:bg-sky-100"
            >
              <span>{categoryLabel}</span>
              <ChevronDown className={`h-5 w-5 transition ${categoryOpen ? 'rotate-180' : ''}`} />
            </button>
            {categoryOpen && (
              <div className="p-4">
                <CategoryFilterField
                  label="Seçim"
                  categories={categories}
                  words={words}
                  selected={filters.categoryIds}
                  onChange={(categoryIds) => onChange({ categoryIds })}
                />
              </div>
            )}
          </section>
        )}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <button
            type="button"
            aria-expanded={statusOpen}
            onClick={() => setStatusOpen((open) => !open)}
            className="flex w-full items-center justify-between gap-3 bg-sky-100/70 px-4 py-4 text-left text-sm font-bold text-slate-900 transition hover:bg-sky-100"
          >
            <span>Öğrenme durumu</span>
            <ChevronDown className={`h-5 w-5 transition ${statusOpen ? 'rotate-180' : ''}`} />
          </button>
          {statusOpen && (
            <div className="p-4">
              <LearningStatusField
                statuses={filters.learningStatuses}
                onChange={(learningStatuses) => onChange({ learningStatuses })}
              />
            </div>
          )}
        </section>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {toggles.map((toggle) => (
          <label key={toggle.label} className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={toggle.checked}
              onChange={(event) => toggle.onChange(event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-500"
            />
            {toggle.label}
          </label>
        ))}
      </div>
    </div>
  );
}
