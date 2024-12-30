import { useState } from "react";
import toast from "react-hot-toast";
import StarRatings from "react-star-ratings";
import Spinner from "./Spinner/Spinner";

const FeedbackForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    serviceTicketId: '',
    serviceDate: '',
    serviceType: '',
    quality: 1,
    professionalism: 1,
    punctuality: 1,
    technicalKnowledge: 1,
    communication: 1,
    valueForMoney: 1,
    overallSatisfaction: 1,
    likes: '',
    improvements: '',
    issues: '',
    issueResolved: '',
    daysToResolve: '',
    suggestions: '',
    recommend: '',
    useAgain: '',
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRatingChange = (rating, field) => {
    console.log(rating, field);
    setFormData((prevData) => ({
      ...prevData,
      [field]: rating,
    }));
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const feedbackData = {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      serviceTicketId: formData.serviceTicketId,
      serviceDate: formData.serviceDate,
      serviceType: formData.serviceType,
      quality: formData.quality,
      professionalism: formData.professionalism,
      punctuality: formData.punctuality,
      technicalKnowledge: formData.technicalKnowledge,
      communication: formData.communication,
      valueForMoney: formData.valueForMoney,
      overallSatisfaction: formData.overallSatisfaction,
      likes: formData.likes,
      improvements: formData.improvements,
      issues: formData.issues,
      issueResolved: formData.issueResolved,
      daysToResolve: formData.daysToResolve,
      suggestions: formData.suggestions,
      recommend: formData.recommend,
      useAgain: formData.useAgain,
      consent: formData.consent
    };

    const confirm = window.confirm("Are you sure to submit the feedback?");
    if(confirm){
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/feedback/submit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(feedbackData),
        });
    
        const data = await response.json();
        if (response.ok) {
          toast.success('Feedback submitted successfully');
          setLoading(false);
        } else {
          toast.error(data.message || 'Something went wrong!');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred while submitting feedback.');
        setLoading(false);
      }
    } else { toast.success("Cancelled Submission");  setLoading(false);}
  
  };
  
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-xl">
      <h2 className="text-3xl font-semibold text-center mb-8 text-primary">Customer Service Feedback Form</h2>
      {
        loading && <Spinner/>
      }
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Customer Information */}
        <section>
          <h3 className="text-2xl font-medium mb-4">1. Basic Customer Information</h3>
          <div className="space-y-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name (Required)"
              required
              className="input input-bordered w-full"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address (Required)"
              required
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number (Required)"
              required
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="serviceTicketId"
              value={formData.serviceTicketId}
              onChange={handleChange}
              required
              placeholder="Service Ticket/Order ID"
              className="input input-bordered w-full"
            />
            <input
              type="date"
              name="serviceDate"
              value={formData.serviceDate}
              required
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
              className="select select-bordered w-full"
            >
              <option value="">Select Service Type</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Automation">Automation</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </section>

        {/* Service Ratings */}
        <section>
      <h3 className="text-2xl font-medium mb-4">2. Service Ratings</h3>
      <div className="space-y-4">
        {[
          'Quality of Service',
          'Professionalism',
          'Punctuality',
          'Technical Knowledge',
          'Communication & Updates',
          'Value for Money',
          'Overall Satisfaction',
        ].map((item, index) => (
          <div key={index}>
            <label className="block mb-2">{item}</label>
            <StarRatings
              rating={formData[item.toLowerCase().replace(/ /g, '')]}
              starRatedColor="gold"
              starHoverColor="orange"
              changeRating={(rating) => handleRatingChange(rating, item.toLowerCase().replace(/ /g, ''))}
              numberOfStars={5}
              name={item.toLowerCase().replace(/ /g, '')}
              starDimension="25px"
              starSpacing="5px"
            />
          </div>
        ))}
      </div>
    </section>

        {/* Open-Text Feedback */}
        <section>
          <h3 className="text-2xl font-medium mb-4">3. Open-Text Feedback</h3>
          <div className="space-y-4">
            <textarea
              name="likes"
              value={formData.likes}
              onChange={handleChange}
              placeholder="What did you like most about our service?"
              className="textarea textarea-bordered w-full"
            />
            <textarea
              name="improvements"
              value={formData.improvements}
              onChange={handleChange}
              placeholder="What could we improve?"
              className="textarea textarea-bordered w-full"
            />
            <textarea
              name="issues"
              value={formData.issues}
              onChange={handleChange}
              placeholder="Describe any issues you faced during the service:"
              className="textarea textarea-bordered w-full"
            />
          </div>
        </section>

        {/* Service Outcome */}
        <section>
          <h3 className="text-2xl font-medium mb-4">4. Service Outcome</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-10 pb-10">
              <label className="mr-4">Was your issue resolved?</label>
              <label className="radio">
                <input
                  type="radio"
                  name="issueResolved"
                  value="Yes"
                  checked={formData.issueResolved === 'Yes'}
                  onChange={handleChange}
                  className="radio radio-primary"
                />
                Yes
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="issueResolved"
                  value="No"
                  checked={formData.issueResolved === 'No'}
                  onChange={handleChange}
                  className="radio radio-primary"
                />
                No
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="issueResolved"
                  value="Partially"
                  checked={formData.issueResolved === 'Partially'}
                  onChange={handleChange}
                  className="radio radio-primary"
                />
                Partially
              </label>
            </div>
            <input
              type="number"
              name="daysToResolve"
              value={formData.daysToResolve}
              onChange={handleChange}
              placeholder="How many days did it take to resolve?"
              className="input input-bordered w-full"
            />
          </div>
        </section>

        {/* Suggestions */}
        <section>
          <h3 className="text-2xl font-medium mb-4">5. Suggestions</h3>
          <textarea
            name="suggestions"
            value={formData.suggestions}
            onChange={handleChange}
            placeholder="Do you have any suggestions for how we can improve?"
            className="textarea textarea-bordered w-full"
          />
        </section>

        {/* Recommendation */}
        <section>
          <h3 className="text-2xl font-medium mb-4">6. Recommendation</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-10 pb-10">
              <label className="mr-4">Would you recommend our service to others?</label>
              <label className="radio">
                <input
                  type="radio"
                  name="recommend"
                  value="Yes"
                  checked={formData.recommend === 'Yes'}
                  onChange={handleChange}
                  className="radio radio-primary"
                />
                Yes
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="recommend"
                  value="No"
                  checked={formData.recommend === 'No'}
                  onChange={handleChange}
                  className="radio radio-primary"
                />
                No
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="recommend"
                  value="Maybe"
                  checked={formData.recommend === 'Maybe'}
                  onChange={handleChange}
                  className="radio radio-primary"
                />
                Maybe
              </label>
            </div>
            <div className="flex items-center gap-10 pb-10">
              <label className="mr-4">Would you use our service again?</label>
              <label className="radio">
                <input
                  type="radio"
                  name="useAgain"
                  value="Yes"
                  checked={formData.useAgain === 'Yes'}
                  onChange={handleChange}
                  className="radio radio-primary"
                />
                Yes
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="useAgain"
                  value="No"
                  checked={formData.useAgain === 'No'}
                  onChange={handleChange}
                  className="radio radio-primary"
                />
                No
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="useAgain"
                  value="Not Sure"
                  checked={formData.useAgain === 'Not Sure'}
                  onChange={handleChange}
                  className="radio radio-primary"
                />
                Not Sure
              </label>
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="btn btn-primary w-full mt-6"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
