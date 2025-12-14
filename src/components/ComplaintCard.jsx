export default function ComplaintCard({
  title,
  category,
  status,
  sentiment,
  createdAt,
}) {
  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Resolved: "bg-green-100 text-green-700",
  };

  const sentimentColor = {
    Positive: "text-green-600",
    Neutral: "text-gray-600",
    Negative: "text-red-600",
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>
        <span
          className={`text-xs px-3 py-1 rounded-full ${statusColor[status]}`}
        >
          {status}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-medium">Category:</span>{" "}
          {category}
        </p>
        <p>
          <span className="font-medium">Sentiment:</span>{" "}
          <span className={sentimentColor[sentiment]}>
            {sentiment}
          </span>
        </p>
        <p>
          <span className="font-medium">Created:</span>{" "}
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
