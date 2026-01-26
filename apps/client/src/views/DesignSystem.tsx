import React from 'react';
import Header from '../shared/components/Header';
import { HighlighterStroke } from '../shared/components/ui/highlighter-stroke';
import { EnergySparkles } from '../shared/components/ui/energy-sparkles';
import { EmphasisStrokes } from '../shared/components/ui/emphasis-strokes';
import { OrganicDivider } from '../shared/components/ui/organic-divider';

const DesignSystem: React.FC = () => {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-black dark:text-white transition-colors duration-300">
      <nav className="fixed top-0 w-full z-50 border-b border-gray-100 dark:border-neutral-800 bg-white/80 dark:bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xl tracking-tighter">DS.FOUNDATION</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a className="text-primary" href="#headings">Headings</a>
            <a className="hover:text-primary transition-colors" href="#body">Body</a>
            <a className="hover:text-primary transition-colors" href="#specialized">Specialized</a>
            <a className="hover:text-primary transition-colors" href="#rules">Rules</a>
            <a className="hover:text-primary transition-colors" href="#responsive">Responsive</a>
            <a className="hover:text-primary transition-colors" href="#testimonials">Testimonials</a>
            <a className="hover:text-primary transition-colors" href="#preview">Components</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-surface-light dark:hover:bg-surface-dark rounded-full transition-colors" onClick={() => document.documentElement.classList.toggle('dark')}>
              <span className="material-symbols-outlined block dark:hidden">dark_mode</span>
              <span className="material-symbols-outlined hidden dark:block">light_mode</span>
            </button>
          </div>
        </div>
      </nav>
      <main className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-24 relative">
            <div className="inline-block px-3 py-1 bg-primary text-black text-xs font-bold uppercase tracking-widest rounded mb-6">Typography Library</div>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-none mb-6">
              The <HighlighterStroke>Typography</HighlighterStroke> Guidelines.
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
              Consistent use of typography ensures that our brand voice is clear, legible, and expressive across all platforms.
            </p>
          </header>

          <section className="mb-32" id="headings">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-4xl font-extrabold tracking-tight">01 Heading Styles</h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-800"></div>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-gray-200 dark:border-neutral-800 overflow-hidden">
              <div className="p-8 md:p-12 space-y-12">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">H1 / 80px / 1.1 LH / ExtraBold</span>
                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter">Display Heading</h1>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">H2 / 48px / 1.2 LH / Bold</span>
                    <h2 className="text-7xl font-bold tracking-tight leading-7xl">Large Section Title</h2>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">H3 / 32px / 1.3 LH / Bold</span>
                    <h3 className="text-6xl font-bold tracking-tight leading-6xl">Subsection Header</h3>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">H4 / 24px / 1.4 LH / Bold</span>
                    <h4 className="text-5xl font-bold leading-5xl">Small Content Title</h4>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">H5 / 20px / 1.5 LH / SemiBold</span>
                    <h5 className="text-4xl font-semibold leading-4xl">Minor Heading Label</h5>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">H6 / 16px / 1.5 LH / Bold</span>
                    <h6 className="text-3xl font-bold uppercase tracking-wider leading-3xl">Accentuated Subtitle</h6>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mb-32" id="body">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-4xl font-extrabold tracking-tight">02 Body Styles</h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-800"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-surface-light dark:bg-surface-dark p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-neutral-800">
                <h3 className="font-bold text-xl mb-8">Body Large (18px)</h3>
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed"><strong>Regular:</strong> Every interface should be intuitive and meaningful. We believe in simplicity that doesn't sacrifice depth.</p>
                  <p className="text-lg leading-relaxed font-semibold italic"><strong>Italic SemiBold:</strong> Designing user-centric systems that empower the modern workforce through clarity.</p>
                  <p className="text-lg leading-relaxed font-bold"><strong>Bold:</strong> Important information that needs visual weight in longer reading passages.</p>
                </div>
              </div>
              <div className="bg-surface-light dark:bg-surface-dark p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-neutral-800">
                <h3 className="font-bold text-xl mb-8">Body Medium (16px)</h3>
                <div className="space-y-6">
                  <p className="text-base leading-relaxed text-gray-600 dark:text-neutral-400"><strong>Regular:</strong> The standard size for most reading experiences. It maintains high legibility and comfort for extended periods.</p>
                  <p className="text-base leading-relaxed italic text-gray-600 dark:text-neutral-400"><strong>Italic:</strong> Used for citations, emphasis, or secondary context within standard body copy.</p>
                  <p className="text-base leading-relaxed font-bold"><strong>Bold:</strong> Highlighting key phrases and terms within standard paragraphs.</p>
                </div>
              </div>
              <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-neutral-800">
                <h3 className="font-bold text-xl mb-8">Body Small (14px)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <p className="text-sm leading-relaxed text-gray-500"><strong>Caption / Regular:</strong> Perfect for metadata, image captions, and supplemental information that doesn't require immediate attention.</p>
                  <p className="text-sm leading-relaxed font-bold uppercase tracking-widest text-gray-500"><strong>Helper / Bold:</strong> Used for small uppercase labels, navigation hints, or status indicators.</p>
                </div>
              </div>
            </div>
          </section>
          <section className="mb-32" id="specialized">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-4xl font-extrabold tracking-tight">03 Specialized Styles</h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-800"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-surface-light dark:bg-surface-dark rounded-2xl border border-gray-200 dark:border-neutral-800">
                <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">code</span>
                  Mono Styles
                </h4>
                <div className="space-y-4">
                  <div className="bg-black text-primary p-4 rounded-lg font-mono text-sm">
                    npm install design-system
                  </div>
                  <p className="font-mono text-xs text-gray-500">v1.2.4 — Updated 2 days ago</p>
                </div>
              </div>
              <div className="p-8 bg-surface-light dark:bg-surface-dark rounded-2xl border border-gray-200 dark:border-neutral-800">
                <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">smart_button</span>
                  Button Styles
                </h4>
                <div className="space-y-4">
                  <button className="w-full py-3 bg-primary text-black font-extrabold rounded-full text-sm uppercase tracking-wider">Primary Action</button>
                  <button className="w-full py-3 border-2 border-black dark:border-white font-bold rounded-full text-sm">Secondary</button>
                </div>
              </div>
              <div className="p-8 bg-surface-light dark:bg-surface-dark rounded-2xl border border-gray-200 dark:border-neutral-800">
                <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">link</span>
                  Link Styles
                </h4>
                <div className="space-y-4">
                  <p><a className="text-black dark:text-white border-b-2 border-primary pb-0.5 hover:bg-primary/20 transition-all font-bold" href="#">Inline Text Link</a></p>
                  <p><a className="text-gray-500 dark:text-neutral-400 hover:text-primary transition-colors flex items-center gap-1 group" href="#">
                    Explore more <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </a></p>
                </div>
              </div>
            </div>
          </section>
          <section className="mb-32" id="rules">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-4xl font-extrabold tracking-tight">04 Typography Rules</h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-800"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-xl mb-4">Letter Spacing (Tracking)</h4>
                  <p className="text-gray-500 dark:text-neutral-400 mb-6">We use negative tracking for large headlines to keep them punchy, and wider tracking for all-caps small text to aid legibility.</p>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-100 dark:border-neutral-800 rounded-xl">
                      <span className="text-[10px] block text-gray-400 mb-2">Display Tracking (-0.05em)</span>
                      <p className="text-4xl font-extrabold tracking-tighter">Tighter Headlines</p>
                    </div>
                    <div className="p-4 border border-gray-100 dark:border-neutral-800 rounded-xl">
                      <span className="text-[10px] block text-gray-400 mb-2">Label Tracking (+0.1em)</span>
                      <p className="text-xs font-bold uppercase tracking-widest">Looser Small Labels</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-xl mb-4">Paragraph Spacing</h4>
                  <p className="text-gray-500 dark:text-neutral-400 mb-6">Our standard vertical rhythm follows the 4px grid. We aim for 1.5x - 2x the font size for spacing between paragraphs.</p>
                  <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-neutral-800">
                    <p className="mb-6">First paragraph with standard 1.6 leading for optimal readability. This ensures that long-form content is easy on the eyes.</p>
                    <div className="h-6 w-full bg-primary/10 border-y border-primary/20 flex items-center justify-center text-[10px] font-mono text-primary">24px Gap (Base 4 x 6)</div>
                    <p className="mt-6">Second paragraph continues the flow. Consistency in these gaps creates a familiar rhythm for the user.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mb-32" id="responsive">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-4xl font-extrabold tracking-tight">05 Responsive Scales</h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-800"></div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm md:text-base">
                <thead>
                  <tr className="text-gray-400 font-mono text-xs uppercase tracking-widest">
                    <th className="py-4 font-normal">Token Name</th>
                    <th className="py-4 font-normal">Desktop (1440px)</th>
                    <th className="py-4 font-normal">Tablet (768px)</th>
                    <th className="py-4 font-normal">Mobile (375px)</th>
                  </tr>
                </thead>
                <tbody className="font-medium">
                  <tr>
                    <td className="py-6 font-mono text-xs">Heading 1</td>
                    <td className="py-6">80px</td>
                    <td className="py-6">64px</td>
                    <td className="py-6">48px</td>
                  </tr>
                  <tr>
                    <td className="py-6 font-mono text-xs">Heading 2</td>
                    <td className="py-6">48px</td>
                    <td className="py-6">40px</td>
                    <td className="py-6">32px</td>
                  </tr>
                  <tr>
                    <td className="py-6 font-mono text-xs">Heading 3</td>
                    <td className="py-6">32px</td>
                    <td className="py-6">28px</td>
                    <td className="py-6">24px</td>
                  </tr>
                  <tr>
                    <td className="py-6 font-mono text-xs">Heading 4</td>
                    <td className="py-6">24px</td>
                    <td className="py-6">20px</td>
                    <td className="py-6">18px</td>
                  </tr>
                  <tr>
                    <td className="py-6 font-mono text-xs">Body Large</td>
                    <td className="py-6">18px</td>
                    <td className="py-6">18px</td>
                    <td className="py-6">16px</td>
                  </tr>
                  <tr>
                    <td className="py-6 font-mono text-xs">Body Medium</td>
                    <td className="py-6">16px</td>
                    <td className="py-6">16px</td>
                    <td className="py-6">14px</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-20 md:mb-32" id="colors">
            <div className="flex items-center gap-4 mb-10 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">02 Color Palette</h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-800"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              <div className="group">
                <div className="aspect-square bg-primary rounded-2xl mb-4 shadow-lg flex items-end p-4">
                  <span className="text-black font-extrabold text-xl">100%</span>
                </div>
                <p className="font-bold">Electric Lime</p>
                <p className="text-sm font-mono text-gray-500 uppercase">#DFFF00</p>
              </div>
              <div className="group">
                <div className="aspect-square bg-lavender rounded-2xl mb-4 flex items-end p-4">
                  <span className="text-black font-extrabold text-xl">100%</span>
                </div>
                <p className="font-bold">Soft Lavender</p>
                <p className="text-sm font-mono text-gray-500 uppercase">#D6C6F2</p>
              </div>
              <div className="group">
                <div className="aspect-square bg-black border border-white/10 rounded-2xl mb-4 flex items-end p-4">
                  <span className="text-white font-extrabold text-xl">100%</span>
                </div>
                <p className="font-bold">Deep Black</p>
                <p className="text-sm font-mono text-gray-500 uppercase">#000000</p>
              </div>
              <div className="group">
                <div className="aspect-square bg-gray-100 dark:bg-neutral-800 rounded-2xl mb-4 flex items-end p-4">
                  <span className="font-extrabold text-xl">10%</span>
                </div>
                <p className="font-bold">Cool Gray</p>
                <p className="text-sm font-mono text-gray-500 uppercase">#F3F4F6</p>
              </div>
            </div>
          </section>

          <section className="mb-32" id="spacing">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-4xl font-extrabold tracking-tight">03 Spacing & Grid</h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-800"></div>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-neutral-800">
              <p className="mb-8 text-gray-500 dark:text-neutral-400">Our spacing system is built on a 4px base grid, ensuring consistency and rhythm across all layouts.</p>
              <div className="flex flex-wrap items-end gap-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <span className="text-xs font-mono">4px</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-xs font-mono">8px</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                  <span className="text-xs font-mono">16px</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full"></div>
                  <span className="text-xs font-mono">32px</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-primary rounded-full"></div>
                  <span className="text-xs font-mono">64px</span>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-32 h-32 bg-primary rounded-full"></div>
                  <span className="text-xs font-mono">128px</span>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-32" id="icons">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-4xl font-extrabold tracking-tight">04 Hand-drawn Doodles</h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-800"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-12 border border-gray-200 dark:border-neutral-800 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                <EnergySparkles className="w-24 h-24" />
                <p className="mt-8 font-bold text-center">Energy Sparkles</p>
              </div>
              <div className="p-12 border border-gray-200 dark:border-neutral-800 rounded-2xl flex flex-col items-center justify-center group">
                <EmphasisStrokes className="py-2" />
                <p className="mt-8 font-bold text-center">Emphasis Strokes</p>
              </div>
              <div className="p-12 border border-gray-200 dark:border-neutral-800 rounded-2xl flex flex-col items-center justify-center">
                <OrganicDivider />
                <p className="mt-8 font-bold text-center">Organic Dividers</p>
              </div>
            </div>
          </section>

          <section className="mb-32" id="testimonials">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-4xl font-extrabold tracking-tight">06 Testimonial Patterns</h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-800"></div>
            </div>
            <div className="space-y-16">
              <div>
                <h3 className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-8">Component Showcase</h3>
                <div className="bg-surface-light dark:bg-surface-dark p-8 md:p-16 rounded-3xl border border-gray-200 dark:border-neutral-800 flex justify-center">
                  <div className="max-w-xl w-full p-10 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 relative">
                    <p className="text-xl italic text-gray-800 dark:text-gray-200 leading-relaxed mb-8">
                      "The typography in this system is <HighlighterStroke>exceptionally crafted</HighlighterStroke>. It strikes the perfect balance between professional utility and brand character."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                        <img alt="User Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm2vKXYxxU-bWtHFRTBuEiN6_X7LC0XEPDo0EFyzZgWheAhV8YWtn7UQQWtn7BtYFm47o-cwFNHiuSmhtudfnEYclp2FHvHJNwr0cZyIgTg1oC880zA1RIB6eUerr8w24FEye48qIDS9foccV0oe9LYj5qbcMJS5sc2LkUC3z5BcEIOt3kHNNSAQyG5T0J9Wb89YnsShp7celDM721hNXdyOaMR96Nx7DSFxl0Ixb6sp7bsx5YV6z2JR8cEf0WtXSLspNKikicfGk" />
                      </div>
                      <div>
                        <p className="font-bold text-base leading-tight">Marcus Thorne</p>
                        <p className="text-sm text-gray-500 dark:text-neutral-400">Creative Director, Studio Flux</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h4 className="font-bold text-xl mb-4">Typography for Quotes</h4>
                    <p className="text-gray-500 dark:text-neutral-400 mb-4">Testimonials should use Italics to signify a distinct voice. Names and titles remain in Regular font for hierarchy.</p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2 text-sm">
                        <span className="material-symbols-outlined text-primary">check_circle</span>
                        <span><strong>Quote Body:</strong> 18px Italic / 1.6 LH</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <span className="material-symbols-outlined text-primary">check_circle</span>
                        <span><strong>Author Name:</strong> 16px Bold Regular</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-4">Using Emphasis Strokes</h4>
                    <p className="text-gray-500 dark:text-neutral-400 mb-6">Use 'Energy Sparkles' or 'Emphasis Strokes' to highlight key outcomes. Limit to one highlight per card to maintain focus.</p>
                    <div className="p-6 bg-primary/5 rounded-xl border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-primary text-sm">auto_awesome</span>
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">Brand Highlight</span>
                      </div>
                      <p className="text-sm italic">"The process was <span className="highlighter-stroke">incredibly fast</span> and easy."</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  <h4 className="font-bold text-xl">Layout Variations</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-neutral-800">
                      <p className="text-[10px] font-mono text-gray-400 uppercase mb-4">Variation A: 3-Column Grid</p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-12 bg-white dark:bg-neutral-800 rounded border border-gray-100 dark:border-neutral-700"></div>
                        <div className="h-12 bg-white dark:bg-neutral-800 rounded border border-gray-100 dark:border-neutral-700"></div>
                        <div className="h-12 bg-white dark:bg-neutral-800 rounded border border-gray-100 dark:border-neutral-700"></div>
                      </div>
                    </div>
                    <div className="p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-neutral-800">
                      <p className="text-[10px] font-mono text-gray-400 uppercase mb-4">Variation B: Single Featured Card</p>
                      <div className="h-24 bg-white dark:bg-neutral-800 rounded border border-gray-100 dark:border-neutral-700 flex items-center justify-center p-4">
                        <div className="w-full h-2 bg-gray-100 dark:bg-neutral-700 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-8">Grid Implementation</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-8 bg-surface-light dark:bg-surface-dark rounded-2xl border border-gray-200 dark:border-neutral-800">
                    <p className="italic text-sm mb-6 leading-relaxed">"The attention to detail in the typography is exactly what our brand needed to stand out."</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                      <div>
                        <p className="text-xs font-bold">Sarah Jenkins</p>
                        <p className="text-[10px] text-gray-500 uppercase">Head of Product</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 bg-surface-light dark:bg-surface-dark rounded-2xl border border-gray-200 dark:border-neutral-800">
                    <p className="italic text-sm mb-6 leading-relaxed">"A truly comprehensive design system. The mono fonts for our tech specs were a great touch."</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                      <div>
                        <p className="text-xs font-bold">Leo Zhang</p>
                        <p className="text-[10px] text-gray-500 uppercase">Lead Developer</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 bg-surface-light dark:bg-surface-dark rounded-2xl border border-gray-200 dark:border-neutral-800">
                    <p className="italic text-sm mb-6 leading-relaxed">"The documentation makes it so easy to onboard new designers to our typography standards."</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                      <div>
                        <p className="text-xs font-bold">Elena Rossi</p>
                        <p className="text-[10px] text-gray-500 uppercase">Design Ops</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-32" id="preview">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-4xl font-extrabold tracking-tight">07 Component Showcase</h2>
              <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-800"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-surface-light dark:bg-surface-dark p-12 rounded-3xl border border-gray-200 dark:border-neutral-800 flex flex-col items-center justify-center gap-8">
                <button className="px-8 py-4 bg-primary text-black font-extrabold rounded-full hover:scale-105 transition-transform">
                  See all work
                </button>
                <button className="px-8 py-4 bg-lavender text-black font-extrabold rounded-full hover:scale-105 transition-transform">
                  Contact Me
                </button>
                <button className="px-8 py-4 border-2 border-black dark:border-white font-extrabold rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                  View Process
                </button>
              </div>
              <div className="bg-surface-light dark:bg-surface-dark p-12 rounded-3xl border border-gray-200 dark:border-neutral-800">
                <div className="space-y-6">
                  <div className="w-full h-48 bg-gray-200 dark:bg-neutral-800 rounded-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-lavender/20"></div>
                    <div className="absolute bottom-4 left-4 p-2 bg-white/90 dark:bg-black/90 rounded-lg text-xs font-bold uppercase tracking-wider">Case Study</div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold mb-2">University App Vol. 2</h3>
                    <p className="text-gray-500 dark:text-neutral-400">Mobile design concept for academic management.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="border-t border-gray-100 dark:border-neutral-800 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-extrabold text-xl tracking-tighter">DS.FOUNDATION</span>
            <p className="text-sm text-gray-500">© 2024 Design System for UX/UI Portfolio.</p>
          </div>
          <div className="flex gap-8 text-sm font-bold">
            <a className="hover:text-primary" href="#">Twitter</a>
            <a className="hover:text-primary" href="#">Dribbble</a>
            <a className="hover:text-primary" href="#">Behance</a>
            <a className="hover:text-primary" href="#">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DesignSystem;