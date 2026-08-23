import React from "react";
import { MapPin, Train, Plane, Car, CloudSun, Landmark, PhoneCall, ExternalLink, Navigation, ShieldCheck } from "lucide-react";
import { venueData } from "../data/venueData";

export default function VenueGuide() {
  return (
    <section id="venue" className="py-20 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Venue & Travel Guide</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans mb-4">
            Venue & Tiruchirappalli (TPJ)
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Convenient transit options, railway connectivity, airport links, and local heritage attractions for visiting delegates and faculty.
          </p>
        </div>

        {/* Venue Highlight Card */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-700 uppercase tracking-wider mb-2">
                <Navigation className="w-4 h-4 text-blue-600" />
                <span>Conference Venue</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                {venueData.venueName}
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                {venueData.campus} • {venueData.address}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                  <CloudSun className="w-4 h-4 text-amber-500" />
                  <span>{venueData.weatherInfo.avgTemp}</span>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Fully Air-Conditioned Convention Center</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0">
              <a
                href="https://maps.google.com/?q=Divisional+Railway+Hospital+Golden+Rock+Tiruchirappalli"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-2xs flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="#contacts"
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs transition-colors shadow-2xs flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-slate-600" />
                <span>Contact Hospitality Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3-Column Connectivity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {venueData.connectivity.map((item, idx) => {
            const Icon = idx === 0 ? Train : idx === 1 ? Plane : Car;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1">
                  {item.mode}
                </h4>
                <div className="text-xs font-semibold text-blue-700 mb-2">
                  {item.title}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.details}
                </p>
                <div className="text-[11px] font-mono text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/80 inline-block font-medium">
                  {item.distance}
                </div>
              </div>
            );
          })}
        </div>

        {/* Local Sightseeing & Heritage */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-6">
            <Landmark className="w-5 h-5 text-amber-600" />
            <h3 className="text-xl font-bold text-slate-900">
              Explore Historic Tiruchirappalli (Trichy)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {venueData.localAttractions.map((spot, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-amber-700 font-semibold mb-2">
                    <span>{spot.tag}</span>
                    <span className="text-slate-600">{spot.distance}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                    {spot.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {spot.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency & Helpline desk */}
        <div id="contacts" className="mt-12 p-6 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600 font-mono mb-4">
            Conference Assistance & Helplines:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {venueData.emergencyContacts.map((contact, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                <div className="text-xs font-semibold text-slate-700">{contact.title}</div>
                <div className="text-sm font-mono font-bold text-blue-700 mt-1">{contact.phone}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
