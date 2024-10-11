import PropTypes from "prop-types";


function Navbar({ setStatusFilter, setDateFilter, setSearchQuery }) {

    return (
        <div className="flex flex-wrap p-2 bg-gray-300 text-[#878790] shadow-xl shadow-gray-400">
            <select onChange={(e) => setStatusFilter(e.target.value)} className="p-2 border border-gray-400 rounded-lg mr-2">
                <option value="">Status</option>
                <option value="Ativo">Ativo</option>
                <option value="Desativado">Inativo</option>
            </select>

            <input 
                type="date" 
                onChange={(e) => setDateFilter(e.target.value)} 
                className="p-2 border border-gray-400 rounded-lg mr-2" 
            />
            
            <input 
                type="text" 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Pesquisar" 
                className="p-2 border border-gray-400 rounded-lg mr-2" 
            />
        </div>
    );
}

Navbar.propTypes = {
    setStatusFilter: PropTypes.func.isRequired,
    setDateFilter: PropTypes.func.isRequired,
    setSearchQuery: PropTypes.func.isRequired
};

export default Navbar;
