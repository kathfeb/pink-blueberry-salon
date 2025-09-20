import React from "react";
import { useNavigate } from "react-router-dom";
import { stylists } from "../../data/stylists";

const StylistsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBookWithStylist = (stylistId: number) => {
    // Pass the stylist ID to pre-select in booking flow
    navigate("/book", { state: { selectedStylist: stylistId } });
  };

  return (
    <div className="min-h-screen gradient-bg py-12">
      <div className="container-app">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="heading-display mb-4">Meet Our Team</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our talented stylists bring years of experience and passion for
            creating beautiful hair transformations
          </p>
        </div>

        {/* Stylists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {stylists.map((stylist) => (
            <div key={stylist.id} className="card text-center">
              {/* Avatar */}
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-pink-200 to-blue-200 rounded-full flex items-center justify-center">
                <span className="text-5xl">
                  {stylist.id === 1 && "👩‍🦰"}
                  {stylist.id === 2 && "👨‍🦱"}
                  {stylist.id === 3 && "👩‍🦱"}
                  {stylist.id === 4 && "👩"}
                  {stylist.id === 5 && "👰"}
                  {stylist.id === 6 && "🌀"}
                </span>
              </div>

              {/* Stylist Info */}
              <h3 className="text-xl font-semibold mb-1">{stylist.name}</h3>
              <p className="text-blue-600 font-medium mb-3">{stylist.title}</p>

              {/* Rating */}
              <div className="flex items-center justify-center mb-4">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="font-semibold">{stylist.rating}</span>
                <span className="text-slate-500 ml-1">/ 5.0</span>
              </div>

              {/* Bio */}
              <p className="text-slate-600 mb-4">{stylist.bio}</p>

              {/* Specialties */}
              <div className="mb-6">
                <p className="text-sm text-slate-500 mb-2">Specialties:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {stylist.specialties.map((specialty, index) => (
                    <span key={index} className="badge-blue text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={() => handleBookWithStylist(stylist.id)}
                className="btn-secondary w-full"
              >
                Book with {stylist.name.split(" ")[0]}
              </button>
            </div>
          ))}
        </div>

        {/* Team Awards Section */}
        <div className="mt-16 text-center bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="heading-section mb-8">Our Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="font-semibold">Best Salon 2023</h3>
              <p className="text-sm text-slate-600">City Beauty Awards</p>
            </div>
            <div>
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="font-semibold">5-Star Rating</h3>
              <p className="text-sm text-slate-600">Google Reviews</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🎓</div>
              <h3 className="font-semibold">Certified Experts</h3>
              <p className="text-sm text-slate-600">L'Oréal Professional</p>
            </div>
            <div>
              <div className="text-3xl mb-2">💎</div>
              <h3 className="font-semibold">Premium Partner</h3>
              <p className="text-sm text-slate-600">Redken Elite</p>
            </div>
          </div>
        </div>

        {/* Join Our Team CTA */}
        <div className="mt-16 text-center">
          <h2 className="heading-section mb-4">Join Our Team</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Are you a talented stylist looking for a new home? We're always
            looking for passionate professionals to join our team.
          </p>
          <button className="btn-primary">View Career Opportunities</button>
        </div>
      </div>
    </div>
  );
};

export default StylistsPage;
