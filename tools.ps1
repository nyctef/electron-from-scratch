function nextcommit() {
    $nextHash = git rev-list --topo-order HEAD..rg-demo | select -last 1
    git checkout $nextHash
    write-host "Files changed:"
    git show --pretty="" --name-only
}