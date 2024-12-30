import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from './Spinner/Spinner';

const FeedbacksDisplay = ({ data, setRefetch }) => {
    const [loading, setLoading] = useState(false);
    const deleteFeedback = async (id) => {
        setLoading(true);
        const confirm = window.confirm("Are you sure to delete the feedback?");
        if (confirm) {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/feedback/${id}`, {
                    method: 'DELETE',
                });

                const result = await response.json();

                if (response.ok) {
                    toast.success('Feedback deleted successfully');
                    setLoading(false);
                    setRefetch(true);
                    // Optionally update the UI to remove the deleted feedback
                } else {
                    toast.error(result.message || 'Error deleting feedback');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Error deleting feedback');
                setLoading(false);
            }
        } else { toast.success("Cancelled"); setLoading(false);}
    };

    return (
        <div className="space-y-6">
            {loading && <Spinner/>}
            {data?.map((item) => (
                <div key={item._id} className="card bg-base-100 shadow-xl p-6">
                    <h3 className="text-2xl font-semibold mb-4">Service Ticket ID: {item.serviceTicketId}</h3>

                    {/* Customer Info Section */}
                    <div className="flex flex-col sm:flex-row sm:space-x-8 mb-4">
                        <div>
                            <p><strong>Full Name:</strong> {item.fullName}</p>
                            <p><strong>Email:</strong> {item.email}</p>
                            <p><strong>Phone Number:</strong> {item.phoneNumber}</p>
                        </div>
                        <div>
                            <p><strong>Service Date:</strong> {new Date(item.serviceDate).toLocaleDateString()}</p>
                            <p><strong>Service Type:</strong> {item.serviceType}</p>
                        </div>
                    </div>

                    {/* Ratings Section */}
                    <div className="my-4">
                        <h4 className="text-lg font-semibold">Ratings:</h4>
                        <ul className="space-y-2">
                            <li className="flex justify-between"><span>Quality:</span> <span className="badge badge-primary">{item.quality}</span></li>
                            <li className="flex justify-between"><span>Professionalism:</span> <span className="badge badge-primary">{item.professionalism}</span></li>
                            <li className="flex justify-between"><span>Punctuality:</span> <span className="badge badge-primary">{item.punctuality}</span></li>
                            <li className="flex justify-between"><span>Technical Knowledge:</span> <span className="badge badge-primary">{item.technicalKnowledge}</span></li>
                            <li className="flex justify-between"><span>Communication:</span> <span className="badge badge-primary">{item.communication}</span></li>
                            <li className="flex justify-between"><span>Value for Money:</span> <span className="badge badge-primary">{item.valueForMoney}</span></li>
                            <li className="flex justify-between"><span>Overall Satisfaction:</span> <span className="badge badge-primary">{item.overallSatisfaction}</span></li>
                        </ul>
                    </div>

                    {/* Feedback Section */}
                    <div className="my-4">
                        <h4 className="text-lg font-semibold">Feedback:</h4>
                        <div className="space-y-2">
                            <p><strong>Likes:</strong> {item.likes}</p>
                            <p><strong>Improvements:</strong> {item.improvements}</p>
                            <p><strong>Issues:</strong> {item.issues}</p>
                            <p><strong>Issue Resolved:</strong> {item.issueResolved}</p>
                            <p><strong>Days to Resolve:</strong> {item.daysToResolve || 'N/A'}</p>
                            <p><strong>Suggestions:</strong> {item.suggestions}</p>
                        </div>
                    </div>

                    {/* Final Thoughts Section */}
                    <div className="my-4">
                        <h4 className="text-lg font-semibold">Final Thoughts:</h4>
                        <div className="space-y-2">
                            <p><strong>Would Recommend:</strong> {item.recommend}</p>
                            <p><strong>Would Use Again:</strong> {item.useAgain}</p>
                            <p><strong>Consent:</strong> {item.consent ? 'Yes' : 'No'}</p>
                        </div>
                    </div>

                    {/* Action Section (Optional buttons) */}
                    <div className="mt-4 flex space-x-4">
                        <button className="btn btn-primary">Resolve Issue</button>
                        <button className="btn btn-error" onClick={() => deleteFeedback(item._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FeedbacksDisplay;
