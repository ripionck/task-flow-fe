function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex justify-between items-start p-6 border-b border-gray-200 bg-white">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export default PageHeader;
