const LoadingButton = ({ loading, children }: any) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="cursor-pointer text-gray-300"
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin block" />
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;