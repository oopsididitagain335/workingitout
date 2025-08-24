import { useRouter } from "next/router";

export default function PreviewPage() {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
        {username ? `${username}'s BioLink` : "Loading..."}
      </h1>
      <p style={{ marginTop: "12px", color: "#aaa" }}>
        This is the preview page for <strong>{username}</strong>
      </p>
    </div>
  );
}
