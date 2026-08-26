import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { SavedPhrase } from '../types';
import { 
  TrendingUp, 
  AlertCircle, 
  BarChart3, 
  PieChart, 
  Sparkles, 
  CheckCircle2, 
  Filter,
  Calendar,
  Layers
} from 'lucide-react';

interface Props {
  savedPhrases: SavedPhrase[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export interface ErrorCategoryStat {
  category: string;
  count: number;
  color: string;
  description: string;
  examples: string[];
  tip: string;
}

export interface TimelineDataPoint {
  date: Date;
  formattedDate: string;
  count: number;
  cumulative: number;
}

// Heuristic categorization based on text and explanation patterns
export function categorizePhrase(phrase: SavedPhrase): string {
  const text = (phrase.original + ' ' + (phrase.why || '')).toLowerCase();
  
  if (
    text.includes('preposition') || 
    text.includes(' in ') || 
    text.includes(' at ') || 
    text.includes(' on ') || 
    text.includes('article') || 
    text.includes(' the ') || 
    text.includes(' a ') ||
    text.includes(' an ')
  ) {
    return 'Prepositions & Articles';
  }
  
  if (
    text.includes('tense') || 
    text.includes('past') || 
    text.includes('present') || 
    text.includes('future') || 
    text.includes('verb') || 
    text.includes('did') || 
    text.includes('was') || 
    text.includes('were') || 
    text.includes('have been') ||
    text.includes('subject-verb')
  ) {
    return 'Verb Tenses & Agreement';
  }
  
  if (
    text.includes('tone') || 
    text.includes('polite') || 
    text.includes('formal') || 
    text.includes('blunt') || 
    text.includes('diplomatic') || 
    text.includes('courtesy') ||
    text.includes('workplace')
  ) {
    return 'Tone & Workplace Polish';
  }
  
  if (
    text.includes('collocation') || 
    text.includes('vocabulary') || 
    text.includes('word choice') || 
    text.includes('idiom') || 
    text.includes('phrasing') ||
    text.includes('say') ||
    text.includes('tell')
  ) {
    return 'Word Choice & Collocations';
  }
  
  return 'Sentence Flow & Conciseness';
}

const CATEGORY_COLORS: Record<string, string> = {
  'Prepositions & Articles': '#10b981',       // Emerald
  'Verb Tenses & Agreement': '#0284c7',       // Sky Blue
  'Tone & Workplace Polish': '#8b5cf6',       // Purple
  'Word Choice & Collocations': '#f59e0b',    // Amber
  'Sentence Flow & Conciseness': '#ec4899',   // Pink
};

const CATEGORY_TIPS: Record<string, { desc: string; tip: string }> = {
  'Prepositions & Articles': {
    desc: 'Misplaced prepositions (in/at/on) or missing articles (a/an/the).',
    tip: 'Rule of thumb: Use "on" for days/dates, "at" for specific times, and "in" for months/years/enclosed spaces.'
  },
  'Verb Tenses & Agreement': {
    desc: 'Inconsistent past vs. present tense usage or subject-verb number agreement.',
    tip: 'Ensure single third-person subjects ("he/she/it/the manager") take singular verbs ("proposes", "reviews").'
  },
  'Tone & Workplace Polish': {
    desc: 'Phrasing that may sound overly abrupt, informal, or too conversational for business.',
    tip: 'Softening requests with modal verbs ("Could you please provide..." rather than "Send me...") increases executive rapport.'
  },
  'Word Choice & Collocations': {
    desc: 'Unnatural word pairings (e.g. "do a question" instead of "ask a question").',
    tip: 'Learn English in standard chunks: "make a decision", "schedule a meeting", "reach out to colleagues".'
  },
  'Sentence Flow & Conciseness': {
    desc: 'Run-on sentences, redundant modifiers, or unclear clause ordering.',
    tip: 'Aim for 15-20 words per workplace sentence to maintain clarity in high-stakes communications.'
  }
};

export const GrammarAnalyticsDashboard: React.FC<Props> = ({
  savedPhrases,
  selectedCategory,
  onSelectCategory,
}) => {
  const barChartRef = useRef<SVGSVGElement | null>(null);
  const timelineChartRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [activeTab, setActiveTab] = useState<'categories' | 'timeline'>('categories');
  const [hoveredData, setHoveredData] = useState<{ label: string; count: number; percentage: number } | null>(null);

  // Compute category statistics
  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {
      'Prepositions & Articles': 0,
      'Verb Tenses & Agreement': 0,
      'Tone & Workplace Polish': 0,
      'Word Choice & Collocations': 0,
      'Sentence Flow & Conciseness': 0,
    };

    savedPhrases.forEach((p) => {
      const cat = categorizePhrase(p);
      counts[cat] = (counts[cat] || 0) + 1;
    });

    const total = savedPhrases.length || 1;

    return Object.entries(counts).map(([category, count]) => ({
      category,
      count,
      percentage: Math.round((count / total) * 100),
      color: CATEGORY_COLORS[category] || '#10b981',
      description: CATEGORY_TIPS[category]?.desc || '',
      tip: CATEGORY_TIPS[category]?.tip || '',
      examples: []
    })).sort((a, b) => b.count - a.count);
  }, [savedPhrases]);

  // Compute timeline data points
  const timelineData = useMemo<TimelineDataPoint[]>(() => {
    if (!savedPhrases || savedPhrases.length === 0) return [];

    // Group phrases by date
    const dateMap = new Map<string, number>();

    // Sort phrases by creation time ascending
    const sorted = [...savedPhrases].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    sorted.forEach((p) => {
      const d = new Date(p.createdAt);
      const dateStr = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      dateMap.set(dateStr, (dateMap.get(dateStr) || 0) + 1);
    });

    let cumulative = 0;
    const points: TimelineDataPoint[] = [];

    dateMap.forEach((count, dateStr) => {
      cumulative += count;
      points.push({
        date: new Date(),
        formattedDate: dateStr,
        count,
        cumulative,
      });
    });

    return points;
  }, [savedPhrases]);

  // Render D3 Category Bar Chart
  useEffect(() => {
    if (!barChartRef.current || categoryStats.length === 0) return;

    const svg = d3.select(barChartRef.current);
    svg.selectAll('*').remove();

    const width = 480;
    const height = 180;
    const margin = { top: 10, right: 30, bottom: 25, left: 160 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const maxCount = Math.max(...categoryStats.map((d) => d.count), 1);

    const x = d3.scaleLinear().domain([0, maxCount]).range([0, innerWidth]);

    const y = d3
      .scaleBand()
      .domain(categoryStats.map((d) => d.category))
      .range([0, innerHeight])
      .padding(0.28);

    // Background track bars
    g.selectAll('.track-bar')
      .data(categoryStats)
      .enter()
      .append('rect')
      .attr('class', 'track-bar')
      .attr('y', (d) => y(d.category) || 0)
      .attr('height', y.bandwidth())
      .attr('x', 0)
      .attr('width', innerWidth)
      .attr('rx', 5)
      .attr('fill', '#f3f4f6');

    // Data bars with animation
    const bars = g
      .selectAll('.data-bar')
      .data(categoryStats)
      .enter()
      .append('rect')
      .attr('class', 'data-bar')
      .attr('y', (d) => y(d.category) || 0)
      .attr('height', y.bandwidth())
      .attr('x', 0)
      .attr('rx', 5)
      .attr('fill', (d) => d.color)
      .attr('cursor', 'pointer')
      .attr('opacity', (d) => (selectedCategory && selectedCategory !== d.category ? 0.35 : 0.95))
      .on('mouseenter', (event, d) => {
        setHoveredData({
          label: d.category,
          count: d.count,
          percentage: d.percentage,
        });
      })
      .on('mouseleave', () => setHoveredData(null))
      .on('click', (event, d) => {
        if (selectedCategory === d.category) {
          onSelectCategory(null);
        } else {
          onSelectCategory(d.category);
        }
      });

    bars
      .attr('width', 0)
      .transition()
      .duration(750)
      .ease(d3.easeCubicOut)
      .attr('width', (d) => (d.count > 0 ? Math.max(x(d.count), 10) : 0));

    // Value Labels on the right of bars
    g.selectAll('.count-label')
      .data(categoryStats)
      .enter()
      .append('text')
      .attr('class', 'count-label')
      .attr('x', (d) => (d.count > 0 ? Math.max(x(d.count), 10) + 8 : 8))
      .attr('y', (d) => (y(d.category) || 0) + y.bandwidth() / 2 + 4)
      .attr('fill', '#4b5563')
      .attr('font-size', '11px')
      .attr('font-weight', '600')
      .attr('font-family', 'inherit')
      .text((d) => `${d.count}`);

    // Category Y-axis Labels
    g.selectAll('.category-label')
      .data(categoryStats)
      .enter()
      .append('text')
      .attr('class', 'category-label')
      .attr('x', -10)
      .attr('y', (d) => (y(d.category) || 0) + y.bandwidth() / 2 + 4)
      .attr('text-anchor', 'end')
      .attr('fill', (d) => (selectedCategory === d.category ? d.color : '#374151'))
      .attr('font-size', '11px')
      .attr('font-weight', (d) => (selectedCategory === d.category ? '700' : '500'))
      .attr('font-family', 'inherit')
      .attr('cursor', 'pointer')
      .text((d) => d.category)
      .on('click', (event, d) => {
        onSelectCategory(selectedCategory === d.category ? null : d.category);
      });
  }, [categoryStats, selectedCategory, onSelectCategory]);

  // Render D3 Timeline Area & Line Chart
  useEffect(() => {
    if (!timelineChartRef.current) return;

    const svg = d3.select(timelineChartRef.current);
    svg.selectAll('*').remove();

    const width = 480;
    const height = 180;
    const margin = { top: 15, right: 25, bottom: 30, left: 35 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const data = timelineData.length > 0 ? timelineData : [
      { date: new Date(), formattedDate: 'Today', count: savedPhrases.length, cumulative: savedPhrases.length }
    ];

    const x = d3
      .scalePoint()
      .domain(data.map((d) => d.formattedDate))
      .range([0, innerWidth])
      .padding(0.2);

    const maxVal = Math.max(...data.map((d) => d.cumulative), 5);
    const y = d3.scaleLinear().domain([0, maxVal]).range([innerHeight, 0]);

    // Grid lines
    g.append('g')
      .attr('class', 'grid')
      .call(
        d3
          .axisLeft(y)
          .ticks(4)
          .tickSize(-innerWidth)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .attr('stroke', '#e5e7eb')
      .attr('stroke-dasharray', '3,3');

    // Area Generator
    const area = d3
      .area<TimelineDataPoint>()
      .x((d) => x(d.formattedDate) || 0)
      .y0(innerHeight)
      .y1((d) => y(d.cumulative))
      .curve(d3.curveMonotoneX);

    // Line Generator
    const line = d3
      .line<TimelineDataPoint>()
      .x((d) => x(d.formattedDate) || 0)
      .y((d) => y(d.cumulative))
      .curve(d3.curveMonotoneX);

    // Area gradient
    const gradient = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'timeline-area-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#10b981').attr('stop-opacity', 0.4);
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#10b981').attr('stop-opacity', 0.02);

    // Append Area
    g.append('path')
      .datum(data)
      .attr('fill', 'url(#timeline-area-gradient)')
      .attr('d', area);

    // Append Line
    const path = g
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#10b981')
      .attr('stroke-width', 2.5)
      .attr('d', line);

    // Animated path transition
    const totalLength = path.node()?.getTotalLength() || 0;
    path
      .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(900)
      .ease(d3.easeCubicOut)
      .attr('stroke-dashoffset', 0);

    // Circles for data points
    g.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => x(d.formattedDate) || 0)
      .attr('cy', (d) => y(d.cumulative))
      .attr('r', 4.5)
      .attr('fill', '#ffffff')
      .attr('stroke', '#059669')
      .attr('stroke-width', 2)
      .attr('cursor', 'pointer');

    // X-Axis labels
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll('text')
      .attr('dy', '10px')
      .attr('fill', '#6b7280')
      .attr('font-size', '10px')
      .attr('font-family', 'inherit');

    // Y-Axis labels
    g.append('g')
      .call(d3.axisLeft(y).ticks(3).tickSize(0))
      .selectAll('text')
      .attr('dx', '-6px')
      .attr('fill', '#9ca3af')
      .attr('font-size', '9px')
      .attr('font-family', 'inherit');

    svg.selectAll('.domain').remove();
  }, [timelineData, savedPhrases.length]);

  const topCategory = categoryStats[0]?.count > 0 ? categoryStats[0] : null;

  return (
    <div ref={containerRef} className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 shadow-xs">
      {/* Header with Title and Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-neutral-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-neutral-900">Grammar & Error Analytics</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded-full border border-neutral-200">
              D3.js Visualization
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">
            Diagnostic breakdown of recurring speech and writing habits across your saved library.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center bg-neutral-100 p-0.5 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <PieChart className="w-3.5 h-3.5" />
            <span>Categories</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Timeline</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2.5 my-3.5">
        <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
          <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Analyzed Phrases</div>
          <div className="text-lg font-extrabold text-neutral-900 mt-0.5">{savedPhrases.length}</div>
        </div>
        <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
          <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Top Focus Area</div>
          <div className="text-xs font-bold text-emerald-800 truncate mt-1">
            {topCategory ? topCategory.category : 'General Flow'}
          </div>
        </div>
        <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
          <div className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Active Filter</div>
          <div className="text-xs font-bold text-neutral-700 truncate mt-1">
            {selectedCategory ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <Filter className="w-3 h-3" />
                {selectedCategory}
              </span>
            ) : (
              'Showing All'
            )}
          </div>
        </div>
      </div>

      {/* D3 Visualizations Container */}
      <div className="relative bg-neutral-50/60 rounded-xl p-3 border border-neutral-100">
        {activeTab === 'categories' ? (
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-1 px-1">
              <span className="font-medium text-[11px]">Click a bar below to filter saved phrases</span>
              {hoveredData && (
                <span className="font-semibold text-emerald-700 text-[11px] animate-fadeIn">
                  {hoveredData.label}: {hoveredData.count} ({hoveredData.percentage}%)
                </span>
              )}
            </div>
            <svg ref={barChartRef} className="w-full h-44 overflow-visible" />
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-1 px-1">
              <span className="font-medium text-[11px]">Cumulative phrase accumulation & review frequency</span>
              <span className="font-semibold text-emerald-700 text-[11px]">Total: {savedPhrases.length}</span>
            </div>
            <svg ref={timelineChartRef} className="w-full h-44 overflow-visible" />
          </div>
        )}
      </div>

      {/* Dynamic Grammar Tip & Filter Clear Banner */}
      {selectedCategory && (
        <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start justify-between gap-3 animate-fadeIn">
          <div className="space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-emerald-900">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Coach Insight for {selectedCategory}</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              {CATEGORY_TIPS[selectedCategory]?.tip}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectCategory(null)}
            className="text-[10px] font-bold text-emerald-700 hover:text-emerald-900 bg-white/80 hover:bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0 cursor-pointer transition-colors"
          >
            Clear Filter
          </button>
        </div>
      )}
    </div>
  );
};
