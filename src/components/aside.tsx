type AsideProps = {
  showSearchBar: boolean;
}

function Aside(props: AsideProps) {
  return (
    <aside className="w-[350px] md:hidden h-full fixed ml-[598px] ht:ml-[950px]">
      <h1 className="text-white">Who to follow</h1>
    </aside>
  );
}

export default Aside;