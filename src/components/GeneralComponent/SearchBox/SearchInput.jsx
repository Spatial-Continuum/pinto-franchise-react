
function SearchInput()
{
return(
<div className="relative w-80">
<input
type="text"
placeholder="Search"
className="border border-gray-300 rounded-lg px-2 py-3 pl-10 w-80 focus:outline-none focus:ring-2 focus:ring-gray-300"
/>
<svg
className="w-5 h-5 absolute left-3 top-4 text-orange-600"
fill="none"
stroke="currentColor"
viewBox="0 0 24 24"
xmlns="http://www.w3.org/2000/svg"
>
<path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
></path>
</svg> 
</div>) 
} 

export default SearchInput;