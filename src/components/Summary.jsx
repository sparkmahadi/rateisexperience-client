import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { getAuth, signOut } from 'firebase/auth'; // Import Firebase Auth methods

const Summary = () => {
  const [summary, setSummary] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook from react-router-dom
  const auth = getAuth(); // Initialize Firebase Auth

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/feedback/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors', // Ensure CORS is enabled
        });
        const data = await response.json();
        console.log(data);
        setFeedbacks(data);

        // Calculate the summary once data is fetched
        calculateSummary(data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);

  // Calculate the summary from the fetched feedback data
  const calculateSummary = (feedbacks) => {
    const summary = {
      totalFeedbacks: feedbacks.length,
      averageRatings: {
        quality: 0,
        professionalism: 0,
        punctuality: 0,
        technicalKnowledge: 0,
        communication: 0,
        valueForMoney: 0,
        overallSatisfaction: 0
      },
      resolvedIssues: 0,
      unresolvedIssues: 0,
      recommendations: {
        yes: 0,
        no: 0,
        maybe: 0
      },
      usageAgain: {
        yes: 0,
        no: 0,
        notSure: 0
      }
    };

    // Sum up all ratings and other values
    feedbacks.forEach(feedback => {
      summary.averageRatings.quality += feedback.quality;
      summary.averageRatings.professionalism += feedback.professionalism;
      summary.averageRatings.punctuality += feedback.punctuality;
      summary.averageRatings.technicalKnowledge += feedback.technicalKnowledge;
      summary.averageRatings.communication += feedback.communication;
      summary.averageRatings.valueForMoney += feedback.valueForMoney;
      summary.averageRatings.overallSatisfaction += feedback.overallSatisfaction;

      if (feedback.issueResolved === 'Yes') {
        summary.resolvedIssues++;
      } else {
        summary.unresolvedIssues++;
      }

      if (feedback.recommend === 'Yes') {
        summary.recommendations.yes++;
      } else if (feedback.recommend === 'No') {
        summary.recommendations.no++;
      } else {
        summary.recommendations.maybe++;
      }

      if (feedback.useAgain === 'Yes') {
        summary.usageAgain.yes++;
      } else if (feedback.useAgain === 'No') {
        summary.usageAgain.no++;
      } else {
        summary.usageAgain.notSure++;
      }
    });

    // Calculate averages for ratings
    const totalFeedbacks = feedbacks.length;
    for (let key in summary.averageRatings) {
      summary.averageRatings[key] = (summary.averageRatings[key] / totalFeedbacks).toFixed(2);
    }

    setSummary(summary);
  };

  // Function to handle Firebase logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Log out from Firebase
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (!summary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 rounded-lg shadow-xl">
      <h2 className="text-3xl font-semibold text-center mb-8 text-primary">Feedback Summary</h2>
      
      <div>
        <h3 className="text-2xl font-medium mb-4">Total Feedbacks: {summary.totalFeedbacks}</h3>

        <h3 className="text-2xl font-medium mb-4">Average Ratings</h3>
        <ul>
          {Object.keys(summary.averageRatings).map((rating, index) => (
            <li key={index}>
              {rating.charAt(0).toUpperCase() + rating.slice(1)}: {summary.averageRatings[rating]}
            </li>
          ))}
        </ul>

        <h3 className="text-2xl font-medium mb-4">Issue Resolutions</h3>
        <p>Resolved: {summary.resolvedIssues}</p>
        <p>Unresolved: {summary.unresolvedIssues}</p>

        <h3 className="text-2xl font-medium mb-4">Recommendations</h3>
        <p>Yes: {summary.recommendations.yes}</p>
        <p>No: {summary.recommendations.no}</p>
        <p>Maybe: {summary.recommendations.maybe}</p>

        <h3 className="text-2xl font-medium mb-4">Usage Again</h3>
        <p>Yes: {summary.usageAgain.yes}</p>
        <p>No: {summary.usageAgain.no}</p>
        <p>Not Sure: {summary.usageAgain.notSure}</p>
      </div>

      {/* Log out button at the bottom */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-3 mt-6 rounded-lg w-full hover:bg-red-700"
      >
        Log Out
      </button>
    </div>
  );
};

export default Summary;
