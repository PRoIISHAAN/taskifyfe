export default function Avatar({
  size = "8",
  initials = "IT",
  avatarURL,
  avatarColor = "#0052cc",
}) {
  const sizeInPx = typeof size === "number" ? `${size}px` : `${parseInt(size) * 4}px`;
  const textSizeInPx = `${parseInt(size) * 1.5}px`;
  
  return (
    <div style={{ width: sizeInPx, height: sizeInPx }}>
      {avatarURL ? (
        <img src={avatarURL} alt="avatar" className="w-full h-full rounded-full object-cover" />
      ) : (
        <div
          className="w-full h-full rounded-full flex items-center justify-center text-white font-semibold"
          style={{ backgroundColor: avatarColor, fontSize: textSizeInPx }}
        >
          {initials}
        </div>
      )}
    </div>
  );
}
