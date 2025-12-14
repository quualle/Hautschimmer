'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { TreatmentType, AgeGroup } from '@/src/types/blog'

const treatmentTypeLabels: Record<TreatmentType, string> = {
  botox: 'Botox',
  hyaluron: 'Hyaluron',
  prp: 'PRP',
  mesotherapie: 'Mesotherapie',
  andere: 'Andere'
}

const ageGroupLabels: Record<AgeGroup, string> = {
  '18-35': '18-35 Jahre',
  '35-55': '35-55 Jahre',
  '55+': '55+ Jahre'
}

export default function BlogFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedTreatment = searchParams.get('treatment') || ''
  const selectedAgeGroup = searchParams.get('age') || ''

  const handleFilterChange = (type: 'treatment' | 'age', value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(type, value)
    } else {
      params.delete(type)
    }

    router.push(`/blog?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="bg-white/50 backdrop-blur-sm border border-secondary/20 rounded-2xl p-8 mb-12">
      <h2 className="font-serif text-2xl mb-6 text-foreground">Filter</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-2 uppercase tracking-wider">
            Behandlungsart
          </label>
          <select
            value={selectedTreatment}
            onChange={(e) => handleFilterChange('treatment', e.target.value)}
            className="w-full px-4 py-3 bg-white border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          >
            <option value="">Alle Behandlungen</option>
            {Object.entries(treatmentTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-2 uppercase tracking-wider">
            Altersgruppe
          </label>
          <select
            value={selectedAgeGroup}
            onChange={(e) => handleFilterChange('age', e.target.value)}
            className="w-full px-4 py-3 bg-white border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          >
            <option value="">Alle Altersgruppen</option>
            {Object.entries(ageGroupLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
