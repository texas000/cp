// DECLARE @PageNumber AS INT
// DECLARE @RowsOfPage AS INT
// SET @PageNumber=2
// SET @RowsOfPage=4
// SELECT FruitName,Price FROM SampleFruits
// ORDER BY Price
// OFFSET (@PageNumber-1)*@RowsOfPage ROWS
// FETCH NEXT @RowsOfPage ROWS ONLY
